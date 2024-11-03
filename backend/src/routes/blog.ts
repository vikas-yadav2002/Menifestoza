import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    Jwt_secret: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userId = c.get("userId");

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (body.title == "" || body.content == "") {
      return c.json({
        message: "please fill all the inputs",
      })
    }

    if (!success) {
      return c.json({
        message: "incorrect content",
      });
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      message: "succesfully created blog",
      blogId: blog.id,
    });
  } catch (err) {
    console.log(err);
    return c.json({
      message: "Errror while creating blog ",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany(
      {
        select: {
          title: true,
          content: true,
          id: true,
          author: {
            select: {
              name: true
            }
          }
        }
      }
    );
    return c.json({
      blog: blog,
    });
  } catch (err) {
    return c.json({
      message: "Errror while listing blog",
    });
  }
});

blogRouter.put("/update/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogId = Number(c.req.param("id"));
    const body = await c.req.json();

    // Validate the input using Zod
    const { success, error } = updateBlogInput.safeParse(body);

    if (!success) {
      return c.json({
        message: "Incorrect content",
        error: error.errors, // Return Zod validation errors for more context
      }, 400);
    }

    // Check if the post exists before attempting an update
    const existingPost = await prisma.post.findUnique({
      where: { id: blogId },
    });

    if (!existingPost) {
      return c.json({ message: "Blog post not found" }, 404);
    }

    // Update the blog post
    const updatedBlog = await prisma.post.update({
      where: { id: blogId },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      message: "Successfully updated blog",
      blog: updatedBlog,
    });
  } catch (err: any) {
    console.error(err);
    return c.json(
      {
        message: "Error while updating blog",
        error: err.message,
      },
      500,
    );
  }
});

blogRouter.get("/Find/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogId = Number(c.req.param("id"));
    if (!blogId) {
      return c.json({
        message: "provide correct id"
      })
    }
    console.log("hello")
    const Blog = await prisma.post.findUnique({
      where: {
        id: blogId
      },
      select: {
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }

      }

    })

    if (Blog) {
      return c.json({
        blog: Blog
      })
    }


  } catch (err) {

    return c.json({
      message: "Errror while fetching blog ",
      error: err
    });
  }
});

blogRouter.put("/like/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogId = Number(c.req.param('id'));
    const userId = c.get("userId");
    if (!userId || !blogId) {
      return c.json({
        message: "Please Provide all details",
        status: 403,
      })
    }
    const postExists = await prisma.post.findUnique({
      where: { id: blogId },
    });
    
    if (!postExists) {
      return c.json({ message: "Post not found", status: 404 });
    }


    const alreadyliked = await prisma.user.findFirst({
      where: {
        id: userId, // Check for the specific user
        likedPost: {
          some: {
            id: blogId, // Check if the likedPosts array contains the blogId
          },
        },
      },
    });

    if (alreadyliked) {
      return c.json({
        msg: "User has already liked this post."
      })
    } else {


      //inrcreement the like of the blogid
      const [postUpdateResponse, userUpdateResponse] = await prisma.$transaction([

        //check if user has already liked it or not 

        // Update the post to increment likes and connect the user
        prisma.post.update({
          where: { id: blogId },
          data: {
            likes: {
              increment: 1, // Increment the likes count
            },
            likedBy: {
              connect: { id: userId }, // Connect the user who liked the post
            },
          },
        }),

        // Update the user to add the liked post
        prisma.user.update({
          where: { id: userId },
          data: {
            likedPost: {
              connect: { id: blogId }, // Connect the post to the user’s likedPosts
            },
          },
        }),
      ]);

      console.log('Post updated:', postUpdateResponse);
      console.log('User updated with liked post:', userUpdateResponse);

      return c.json({
        Postupdate: postUpdateResponse,
        userupadte: userUpdateResponse
      })
    }

  } catch (e: any) {
    console.log("error ", e)
  }
})

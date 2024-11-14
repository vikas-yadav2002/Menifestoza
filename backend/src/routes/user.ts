import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@100xdevs/medium-common";
import { jwtDecode } from "jwt-decode";

export const Userouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    Jwt_secret: string;
  };
  Variables: {
    userId: string;
  };
}>();
//signup
Userouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body)

    if (!success) {
      return c.json({
        message: "incorrect details"
      })
    }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.username },
    });

    if (existingUser) {
      return c.json({ error: "User already exists" }, 400);
    }
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name,
      },
    });
    console.log("JWT Secret:", c.env.Jwt_secret);

    const jwt = await sign({ id: user.id }, c.env.Jwt_secret);
    return c.json({
      token: jwt,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to generate token", err: error }, 500);
    // return c.text(error)
  }
});

// signin ----->
Userouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "incorrect details",
      status: 403
    });
  }


  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
    },
  });
  if (!user) {
    return c.json({
      message: "user  not found ",
      status: 403
    });
  }
  const token = await sign({ id: user.id }, c.env.Jwt_secret);
  return c.json({
    token: token,
    username: user.name,
  });
});

//details --->>>>
Userouter.get("/detail", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // const token  = localStorage.getItem("token");
  const headers = c.req.header("authorization") || "";
  const token = headers.split(" ")[1];
  if (!token) {
    return c.json({
      msg: "you are not logged in",
    })
  }
  try {
    const decoded = await verify(token, c.env.Jwt_secret);
    const userDetails = decoded;
    const userFind = await prisma.user.findFirst({
      where: {
        id: userDetails.id || "",
      }
    })

    return c.json({
      userFind,

    })
  } catch (e) {
    console.log(e)
    return c.json({
      msg: "error",
      error: e,
    })
  }


})

//save post
Userouter.put('/save/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {


    const userId = c.get('userId');
    const blogId = Number(c.req.param('id'));
    console.log(userId, blogId)
    if (!userId || !blogId) {
      return c.json({
        msg: "Provide all the details",
        status: 404,
      })
    }

    const existingBlog = await prisma.post.findFirst({
      where: {
        id: blogId
      }
    })

    if (!existingBlog) {
      return c.json({
        msg: " This post Doesn't Exist ",
        status: 404
      })
    }

    const [userUpdateResponse, postUpdateResponse] = await prisma.$transaction([
      prisma.post.update({
        where: {
          id: blogId
        },
        data: {
          savedBy: {
            connect: {
              id: userId
            }
          }
        }
      }),

      prisma.user.update({
        where: {
          id: userId
        },
        data: {
          savedPost: {
            connect: {
              id: blogId
            }
          }
        }
      })
    ])

    return c.json({
      userUpdateResponse,
      postUpdateResponse
    })

  } catch (e: any) {
    return c.json({
      error: e
    })
  }


})

//follower
Userouter.put('/follow/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get('userId');
    const authorId = c.req.param('id');

    // Check if the author exists
    const author = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!author) {
      return c.json({
        msg: "This author doesn't exist",
        status: 404,
      });
    }
    const existingFollow = await prisma.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: authorId,
        },
      },
    });

    if (existingFollow) {
      console.log('User is already following the author');
      return  c.json({
        msg : "user is already following author"
      })
      
    }
    
    const follow = await prisma.follower.create({
      data: {
        followerId: userId,   // The user who is following (Bittu Yadav)
        followingId: authorId, // The user being followed (Vikas Yadav)
      },
    });
    
    // Retrieve the updated records
    const updatedFollowingList = await prisma.user.findFirst({
      where: { id: userId }, // userId of "Bittu Yadav"
      include: { follows: true },
    });
    
    const updatedFollowerList = await prisma.user.findFirst({
      where: { id: authorId }, // authorId of "Vikas Yadav"
      include: { followedBy: true },
    });
    
    return c.json({
      updatedFollowingList,
      updatedFollowerList,
      follow,
    });
   
   
    
  }
  catch (error: any) {
    console.error("Transaction error:", error);
    return c.json({ error: "Failed to follow user", details: error.message });
  }
  finally {
    await prisma.$disconnect();
  }
});


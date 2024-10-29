import {Hono} from "hono";
import {Userouter} from './routes/user';
import {blogRouter} from './routes/blog';
import {verify} from "hono/jwt";
import {cors} from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    Jwt_secret: string;
  }, Variables: {
    userId: string;
  }
}>();

app.use('/api/*', cors());
app.get('/' , async (c)=>{
    return c.json({
        message: "incorrect details",
      });
})

app.use("/api/v1/blog/*", async (c, next) => {
    const headers = c.req.header("authorization") || "";
    const token = headers.split(" ")[1];

    try {
        const response = await verify(token, c.env.Jwt_secret) as { id: string };  // Type assertion
        if (response && response.id) {
            console.log("the response is :", response);
            c.set("userId", response.id);  // Now `response.id` is recognized as a string
            return next();
        } else {
            return c.json({
                message: "unauthorized"
            }, 403);
        }
    } catch (error) {
        console.log(error);
        return c.json({
            msg: "invalid credentials"
        }, 403);
    }
});

app.route('/api/v1/user', Userouter);
app.route('/api/v1/blog', blogRouter);

export default app;

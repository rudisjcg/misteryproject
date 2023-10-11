import FormComments from "@/components/FormComments";
import LayoutPage from "@/components/LayoutPage";
import { mongooseConnect } from "@/lib/mongoose";
import Comment from "@/models/comment";


async function getComments () {
    await mongooseConnect();
      const comments = await Comment.find({}, null, { sort: { _id: -1 } });
      cache: "no-store"
      return  JSON.parse(JSON.stringify(comments));
}
export default async function Home() {
    const comments = await getComments();

    
  return (
    <LayoutPage>
      <FormComments/>
      <div>
        Comments!
        <div>
            {comments?.map((comment) => (
                <div key={comment._id}>
                    <h3>
                        {comment.comment}
                    </h3>
                    <picture>
                    </picture>
                </div>
            ))}
        </div>
    </div>  
    </LayoutPage>
  );
}

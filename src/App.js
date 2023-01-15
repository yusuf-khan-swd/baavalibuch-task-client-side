import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    reset();
    handlePostData(value);
  };

  const handlePostData = async (data) => {
    const postRes = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const postData = await postRes.json();

    if (postData.acknowledged) {
      toast.success("You have posted successfully!");
    }
  };

  return (
    <div className="container mx-auto h-[40vh] flex justify-center items-center">
      <div className="card m-2">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-2">
          <div className="form-control flex-row relative">
            <input
              {...register("postMessage", {
                required: "Please Type Something",
              })}
              type="text"
              placeholder="Post a Message"
              className="input input-bordered mr-2 rounded-3xl sm:w-[400px]"
            />
            <button className="btn btn-primary absolute right-2 rounded-3xl">
              Send
            </button>
          </div>
          <p className="text-red-600 text-center h-7">
            {errors?.postMessage?.message}
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;

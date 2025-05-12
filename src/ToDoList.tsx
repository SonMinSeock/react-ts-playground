import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "Email is Required.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed.",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { required: "First Name is Required." })} placeholder="First Name" />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: "Last Name is Required." })} placeholder="Last Name" />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", {
            required: "Username is Required.",
            minLength: { value: 10, message: "Your username is too short." },
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "Password is Required.",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password1 is Required.",
            minLength: { value: 5, message: "Your password1 is too short." },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;

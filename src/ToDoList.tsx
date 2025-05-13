import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>();

  const onValid = (data: IFormData) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "Password are not the same." }, { shouldFocus: true });
    }
    // setError("extraError", { message: "Server offline." });
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
        <input
          {...register("firstName", {
            required: "First Name is Required.",
            validate: {
              noSon: (data: string) => (data.includes("Son") ? "no Son not allowed." : true),
              noNiki: (data: string) => (data.includes("Niki") ? "no Niki not allowed." : true),
            },
          })}
          placeholder="First Name"
        />
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
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;

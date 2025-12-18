import CustomButton from "../../components/CustomButton"
import TextField from "../../components/TextField"
import { useForm } from "../../components/useForm"
import { Rules } from "../../components/FormValidation"
import { useAppDispatch } from "../../app/hooks"
import { onDispose, registerByEmailAndPassword, type RegisterForm } from "./RegisterViewModel"
import { useEffect } from "react"

export default function RegisterView() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        return () => {
            dispatch(onDispose())
        }
    }, [])

    const { values, errors, handleChange, handleBlur, handleSubmit } = useForm<RegisterForm>(
        { fullName: "", email: "", password: "" },
        {
            fullName: [Rules.isRequired("Please input your name")],
            email: [Rules.isRequired(), Rules.isEmail()],
            password: [Rules.isRequired(), Rules.minLength(6)],
        }
    )

    const onSubmit = (vals: RegisterForm) => {
        dispatch(registerByEmailAndPassword(vals))
    }
    
    return (
        <div className="flex flex-col">
            <AppBar />
            <AppTitle />
            <AppSubTitle />
            <form onSubmit={handleSubmit(onSubmit)}>
                <LoginForm
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <div className='h-[85px]'></div>
                <CustomButton label='Create Account' type="submit" />
            </form>
            <_buildNavigateToSignIn />
        </div>
    )

}

type LoginFormProps = {
    values: { fullName: string; email: string; password: string }
    errors: Partial<Record<keyof { fullName: string; email: string; password: string }, string>>
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    handleBlur: React.FocusEventHandler<HTMLInputElement>
}

const LoginForm = ({ values, errors, handleChange, handleBlur }: LoginFormProps) => {
    return (
        <div className="mx-[28px] mt-[52px]">
            <TextField
                title="Full Name"
                hintText="Your name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.fullName}
            />
            <div className='h-[25px]'></div>
            <TextField
                title="Email Address"
                hintText="email@example.com"
                name="email"
                inputType="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.email}
            />
            <div className='h-[25px]'></div>
            <TextField
                title="Password"
                hintText="############"
                name="password"
                inputType="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.password}
            />
        </div>
    )
}



const AppBar = () => {
    return (
        <div className="pt-[67px] text-xl font-titan text-content-primary flex justify-center">
            NOTELY
        </div>
    )
}



const AppTitle = () => {
    return (
        <div className="flex justify-center mt-[58px] font-nunito font-black text-2xl text-primary-secondary text-center">
            Create a free account
        </div>
    )
}
const AppSubTitle = () => {
    return (
        <div className="flex justify-center mt-[5px] font-nunito font-bold text-base text-center leading-[1.2em] text-content-secondary">
            Join Notely for free. Create and share <br /> unlimited notes with your friends.
        </div>
    )
}

// Note: submit button is rendered inside the form above.


const _buildNavigateToSignIn = () => {
    return (
        <div className='flex justify-center'>
            <button className='font-nunito font-extrabold mt-[20px] mb-[39px] text-button-primary'
                onClick={() => {
                }}>
                Already have an account?
            </button>
        </div>
    )
}
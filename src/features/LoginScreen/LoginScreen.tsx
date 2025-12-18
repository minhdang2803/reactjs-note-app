import CustomButton from "../../components/CustomButton"
import TextField from "../../components/TextField"
import { useForm } from "../../components/useForm"
import { Rules } from "../../components/FormValidation"
import { useAppDispatch } from "../../app/hooks"
import { useEffect } from "react"
import { loginWithEmailAndPassword, onDispose, type LoginForm } from "./LoginScreenViewModel"
import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"

export default function LoginView() {
    const data = useSelector((state: RootState) => state.login)
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log(data)

        return () => {
            console.log("LoginScreen dispose()")
            dispatch(onDispose())
        }
    }, [])

    const { values, errors, handleChange, handleBlur, handleSubmit } = useForm<LoginForm>(
        { email: "", password: "" },
        {
            email: [Rules.isRequired(), Rules.isEmail()],
            password: [Rules.isRequired(), Rules.minLength(6)],
        }
    )



    const onSubmit = (vals: LoginForm) => {
        dispatch(loginWithEmailAndPassword(vals))
    }

    return (
        <div className="flex flex-col min-h-screen">
            <AppBar />
            <AppTitle />
            <AppSubTitle />
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
                <LoginForm
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <CustomButton label='Login ' type="submit" />
            </form>
            <_buildNavigateToSignIn />
        </div>
    )

}

type LoginFormProps = {
    values: { email: string; password: string }
    errors: Partial<Record<keyof { email: string; password: string }, string>>
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    handleBlur: React.FocusEventHandler<HTMLInputElement>
}

const LoginForm = ({ values, errors, handleChange, handleBlur }: LoginFormProps) => {
    return (
        <div className="mx-[28px] mt-[52px] h-full flex-1 flex flex-col">
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
            Login to your account
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
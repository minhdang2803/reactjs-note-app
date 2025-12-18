
import { useAppDispatch, } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import PageView from '../../components/PageView';
import { onTapAlreadyHasAccount, onTapGetStarted } from './OnboardingViewModel';
import CustomButton from '../../components/CustomButton';

export const OnboardingView = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <_buildTitle />
            <_buildPageView />
            <_buildButton />
            <_buildNavigateToSignIn />
        </div>
    );
};

const _buildTitle = () => {
    return (
        <div className="pt-[67px] text-xl font-titan text-content-primary flex justify-center">
            NOTELY
        </div>
    )
}

const _buildNavigateToSignIn = () => {
    const dispatch = useAppDispatch();
        const navigate = useNavigate();
    return (
        <div className='flex justify-center'>
            <button className='font-nunito font-extrabold mt-[20px] mb-[39px] text-button-primary'
                onClick={() => {
                    dispatch(onTapAlreadyHasAccount());
                    navigate('/login');
                }}>
                Already have an account?
            </button>
        </div>
    )
}

const _buildButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return <CustomButton
        label='GET STARTED'
        onTap={
            () => {
                dispatch(onTapGetStarted());
                navigate('/register');
            }
        } />

}

const _buildPageView = () => {
    return (
        <div className='flex-1 mt-[114px]'>
            <PageView height="h-full">
                {/* Page 1: existing content */}
                <div className='flex flex-col items-center justify-start pt-[24px] px-6'>
                    <img src="src/assets/bg_onboarding.png" className='max-w-[260px] object-cover' alt="Logo" />
                    <div className='flex justify-center text-center pt-[28px] text-2xl font-nunito font-black' >
                        World’s Safest And <br /> Largest Digital Notebook
                    </div>
                    <div className='flex justify-center text-center pt-[12px] text-base font-nunito font-bold text-content-secondary leading-[1.2rem]' >
                        Notely is the world’s safest, largest and <br /> intelligent digital notebook. Join over <br /> 10M+ users already using Notely.
                    </div>
                </div>

                {/* Page 2 */}
                <div className='flex flex-col items-center justify-start pt-[24px] px-6'>
                    <img src="src/assets/bg_onboarding.png" className='max-w-[260px] object-cover' alt="Logo" />
                    <div className='flex justify-center text-center pt-[28px] text-2xl font-nunito font-black' >
                        World’s Safest And <br /> Largest Digital Notebook
                    </div>
                    <div className='flex justify-center text-center pt-[12px] text-base font-nunito font-bold text-content-secondary leading-[1.3rem]' >
                        Notely is the world’s safest, largest and <br /> intelligent digital notebook. Join over <br /> 10M+ users already using Notely.
                    </div>
                </div>

                {/* Page 3 */}
                <div className='flex flex-col items-center justify-start pt-[24px] px-6'>
                    <img src="src/assets/bg_onboarding.png" className='max-w-[260px] object-cover' alt="Logo" />
                    <div className='flex justify-center text-center pt-[28px] text-2xl font-nunito font-black' >
                        World’s Safest And <br /> Largest Digital Notebook
                    </div>
                    <div className='flex justify-center text-center pt-[12px] text-base font-nunito font-bold text-content-secondary leading-[1.3rem]' >
                        Notely is the world’s safest, largest and <br /> intelligent digital notebook. Join over <br /> 10M+ users already using Notely.
                    </div>
                </div>
            </PageView>
        </div>
    )
}
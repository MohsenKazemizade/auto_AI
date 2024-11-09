/* eslint-disable @next/next/no-img-element */
import LoginForm from '@/components/LoginForm';
import { redirect } from 'next/navigation';
import { getSession } from '../../actions/sessionActions';

const Login = async () => {
  const session = await getSession();

  // Redirect to dashboard if the user is authenticated
  if (session?.userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex w-full items-center overflow-hidden min-h-dvh h-dvh basis-full">
      <div className="flex md: flex-wrap w-full h-dvh">
        {/* Left Section */}
        <div className="hidden flex-1 lg:flex xl:flex 2xl:flex relative bg-gray-200 justify-center items-center">
          <img
            src="/images/truck-driver.jpeg"
            alt="Truck Driver"
            className="absolute inset-0 w-full h-full object-cover opacity-30 "
          />
          <div className="z-10 text-center">
            <h1 className="text-4xl text-black">
              آسامسیر <span className="font-bold">ناوگان</span>
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4">خوش آمدید</h2>
            <p className="text-sm text-gray-600 mb-8">
              برای ورود نام کاربری و رمز عبور خود را وارد کنید
            </p>
            <LoginForm />
          </div>
          <footer className="absolute bottom-4 mt-8 text-center text-xs text-gray-500">
            <p dir="ltr">
              © 2024, Designed & Developed by{' '}
              <a
                href="https://mohsenkazemi.com/"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Mohsen Kazemi
              </a>
              . All Rights Reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;

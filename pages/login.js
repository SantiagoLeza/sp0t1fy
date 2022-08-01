import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center space-y-5">
      <img className="w-52 mb-5" src="http://links.papareact.com/9xl" alt="" />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button  className="bg-[#1ce76a] p-4 rounded-full" 
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}>

            <p className="hover:text-white">Login with {provider.name}</p>

          </button>
        </div>
      ))}

    </div>
  );
}
 
export default Login; 

export async function getServerSideProps() {
  
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
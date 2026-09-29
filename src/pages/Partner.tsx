import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartnerPage = () => {
  const [msg, setMsg] = useState("");
  const [i, setI] = useState(0);
  const navigate = useNavigate()

  const lst = [
    "Access to GrubExpress tools and support",
    "Increase your online OrderCards",
    "Reach customers far away from you",
  ];

  useEffect(() => {
    setMsg(lst[i]);

    const timer = setTimeout(() => {
      setI((prev) => (prev + 1) % lst.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [i]);

  return (
    <div className="min-h-screen w-full bg-white">
      <section className="relative h-[600px] w-full overflow-visible">
        <div
          className="absolute inset-0 bg-cover bg-center bg-green-700"
          style={{
            backgroundImage: "url('/partner-bg.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-between px-8">
          <div className="w-[45%] text-white">
            <div className="mb-5">
              <div className="text-4xl font-black">GE</div>

              <p className="mt-1 text-sm font-bold tracking-wide">
                PARTNER WITH SWIFFY!
              </p>

              <div className="mt-2 h-1 w-10 bg-orange-500" />
            </div>

            <h1 className="max-w-[550px] text-5xl font-bold leading-tight">
              {msg}
            </h1>

            <div className="mt-6 h-1 w-12 rounded-full bg-white" />
          </div>

          <div className="w-[360px] rounded-2xl bg-white p-7 text-black shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold">Get Started</h2>

            <p className="mb-3 text-sm text-gray-500">
              Enter a mobile number or restaurant ID
              <br />
              to continue
            </p>

            <button className="mt-5 h-14 w-full rounded-lg bg-green-700 text-lg font-bold text-white"
            onClick={()=> navigate("/auth?mode=signin&role=admin")}>
              Continue
            </button>

            <p className="mt-5 text-center text-xs text-gray-500">
              By logging in, I agree to Grub Express's
              <span className="font-semibold underline">
                terms & conditions
              </span>
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 top-[520px] z-20 flex w-full max-w-6xl -translate-x-1/2 gap-12 px-8">
          {/* PROCESS CARD */}
          <div className="w-[55%] rounded-2xl bg-white p-8 shadow-xl">
            <p className="text-sm text-gray-500">In just 3 easy steps</p>

            <h2 className="mt-1 text-xl font-bold text-gray-800">
              Get your restaurant delivery-ready in 24hrs!
            </h2>

            <div className="mt-3 h-1 w-10 bg-orange-500" />

            {/* Steps */}
            <div className="mt-6 rounded-2xl bg-gray-100 p-7">
              <div className="space-y-7">
                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-green-700" />
                  <div>
                    <p className="text-xs text-gray-500">STEP 1</p>
                    <p className="font-semibold">
                      Install the Grub Express owner App
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-green-700" />
                  <div>
                    <p className="text-xs text-gray-500">STEP 2</p>
                    <p className="font-semibold">
                      Login/Register using your phone number
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-green-700" />
                  <div>
                    <p className="text-xs text-gray-500">STEP 3</p>
                    <p className="font-semibold">Enter restaurant details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DOCUMENT CARD */}
          <div className="w-[45%] rounded-2xl bg-white p-8 shadow-xl">
            <div className="border-b border-gray-300 pb-5">
              <h4 className="text-sm font-bold text-gray-800">
                For an easy form onboarding process,
              </h4>

              <p className="text-sm text-gray-600">
                you can keep these documents handy.
              </p>
            </div>

            <ul className="mt-6 space-y-5 text-sm font-bold">
              <li className="flex gap-2">
                <span className="text-green-700">•</span>

                <span>
                  FSSAI License copy
                  <span className="ml-2 cursor-pointer font-bold text-green-700 underline">
                    Apply Here
                  </span>
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-green-700">•</span>
                <span>Your Restaurant menu</span>
              </li>

              <li className="flex gap-2">
                <span className="text-green-700">•</span>
                <span>Bank details</span>
              </li>

              <li className="flex gap-2">
                <span className="text-green-700">•</span>
                <span>
                  GSTIN
                  <span className="ml-2 cursor-pointer font-bold text-green-700 underline">
                    Apply Here
                  </span>
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-green-700">•</span>
                <span>PAN card copy</span>
              </li>
            </ul>
          </div>
        </div>
      </section>


      <section className="h-[350px] bg-white" />
    </div>
  );
};

export default PartnerPage;

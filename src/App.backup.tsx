import { env } from "./core/config/env";

import type { ReactElement } from "react";

// const Msg = ({ closeToast, toastProps }) => (
//   <div>
//     Lorem ipsum dolor {toastProps.position}
//     <button>Retry</button>
//     <button onClick={closeToast}>Close</button>
//   </div>
// );

export default function App(): ReactElement {
  // const renderToast = () => {
  //   const msg = "Hello Buddy!";
  //   const option = { onClick: () => toast.dismiss() };
  //   toast.success(msg, option);
  //   toast.error(msg, option);
  //   toast.warning(msg, option);
  //   toast.info(msg, option);
  //   toast(Msg);
  //   toast(SplitButtons, {
  //     closeButton: false,
  //     // remove the padding on the toast wrapper
  //     // make it 400px width
  //     // add a thin purple border because I like purple
  //     className: "p-0 w-[400px] border border-purple-600/40",
  //     ariaLabel: "Email received",
  //   });
  // };

  // const notify = () => {
  //   toast(SplitButtons, {
  //     closeButton: false,
  //     // remove the padding on the toast wrapper
  //     // make it 400px width
  //     // add a thin purple border because I like purple
  //     className: "p-0 w-[400px] border border-purple-600/40",
  //     ariaLabel: "Email received",
  //   });
  // };

  return (
    <>
      <title>{env?.WEBSITE_NAME}</title>
      <meta name="description" content={env?.WEBSITE_DESCRIPTION} />
      <link rel="icon" type="image/svg+xml" href="/is3.svg" />
      <div className="flex-1 min-h-0 flex flex-col p-4 bg-fixed bg-linear-to-br from-gray-50 via-50% to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
        {/* <button type="button" onClick={renderToast}>
          Click Me
        </button>
        <button type="button" onClick={notify}>
          notify
        </button> */}
        <div className="flex-1 min-h-0 xy-center">
          {/* FIXME: warna animasi tidak keluar di halaman */}
          <div className="absolute hidden md:block inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -left-40 size-100 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-40 -right-40 size-100 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
}

// function SplitButtons({ closeToast }: ToastContentProps) {
//   return (
//     // using a grid with 3 columns
//     <div className="grid grid-cols-[1fr_1px_80px] w-full">
//       <div className="flex flex-col p-4">
//         <h3 className="text-zinc-800 text-sm font-semibold">Email Received</h3>
//         <p className="text-sm">You received a new email from somebody</p>
//       </div>
//       {/* that's the vertical line which separate the text and the buttons*/}
//       <div className="bg-zinc-900/20 h-full" />
//       <div className="grid grid-rows-[1fr_1px_1fr] h-full">
//         {/*specifying a custom closure reason that can be used with the onClose callback*/}
//         <button onClick={() => closeToast("reply")} className="text-purple-600">
//           Reply
//         </button>
//         <div className="bg-zinc-900/20 w-full" />
//         {/*specifying a custom closure reason that can be used with the onClose callback*/}
//         <button onClick={() => closeToast("ignore")}>Ignore</button>
//       </div>
//     </div>
//   );
// }

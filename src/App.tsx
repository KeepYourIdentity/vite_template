import { AlertTriangle, CheckCircle2, CircleAlert, Info } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { env } from "./core/config/env";

import type { ReactElement } from "react";
import type { IconProps, TypeOptions } from "react-toastify";

const customToastIcon = (props: IconProps): ReactElement | true => {
  const iconClass = "text-white size-10";
  const iconGroup: Record<TypeOptions, ReactElement | true> = {
    success: <CheckCircle2 className={iconClass} />,
    error: <CircleAlert className={iconClass} />,
    warning: <AlertTriangle className={iconClass} />,
    info: <Info className={iconClass} />,
    default: true,
  };

  return iconGroup[props.type];
};

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
      <meta name="description" content="project-rbb" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <div className="flex-1 min-h-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 font-sans text-gray-800 dark:text-gray-200">
        {/* <button type="button" onClick={renderToast}>
          Click Me
        </button>
        <button type="button" onClick={notify}>
          notify
        </button> */}
      </div>
      <ToastContainer icon={customToastIcon} theme="colored" position="top-right" />
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

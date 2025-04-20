import { lazy, Suspense } from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";
const Body = lazy(() => import("./Pages/Body"))
const Login = lazy(() => import("./Pages/Login"))
const Feed = lazy(() => import("./Pages/Feed"))
const Profile = lazy(() => import("./Pages/Profile"))
const SignUp = lazy(() => import("./Pages/SignUp"))
const Connections = lazy(() => import("./Pages/Connections"))
const Requests = lazy(() => import("./Pages/Requests"))
const Premium = lazy(() => import("./Components/Premium"))
const Chat = lazy(() => import("./Components/Chat"))
const AskAI = lazy(() => import("./Components/AskAI"))
const Jobs = lazy(() => import("./Pages/Jobs"))
const AddJob = lazy(() => import("./Components/AddJob"))
const Events = lazy(() => import("./Pages/Events"))
const AddEvent = lazy(() => import("./Components/AddEvent"))
const Landingpage = lazy(() => import("./Pages/LandingPage"))


import { Navigate } from "react-router-dom";




function App() {

  const LoadingFallback = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  return (
    <>

      <Suspense fallback={LoadingFallback}>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<SignUp />} />

            <Route path="/" element={<Landingpage />} />


            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
            <Route path="/ask/ai" element={<AskAI />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/addJob" element={<AddJob />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/addEvent" element={<AddEvent />} />


          </Route>

        </Routes>
      </Suspense>
    </>
  )
}

export default App;

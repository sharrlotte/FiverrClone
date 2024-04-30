import Image from "next/image";
import '@/app/globals.css'

export default function Home() {
  return (
    <main className="flex flex-col ">
      <div className="bg-inherit backgroud">
        <div className="container nav-bar bg-green-900">
          <nav>
            <a href="" className="pl-10 px-5 py-5 text-center text-bla">Fiverr</a>
            <ul className="main-menu">
              <li><a href="">Fiverr Pro</a>
                <ul className="sub-menu bg-slate-100">
                  <li className="hover:bg-gray-200/50">
                    <a href="">
                      <div className="grid grid-cols-4">
                        <div>
                          <Image
                            src='/image/COC-COC.ico'
                            alt='menu-1'
                            width={100}
                            height={24}
                          />
                        </div>
                        <div className="col-span-3 text-base/4 font-design text-black">
                          <h2 className=" font-bold font-sans">I'm looking to hire</h2>
                          <span className="font-sans">I'd like to work with Pro freelancers and agencies
                            while using free business tools. </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="hover:bg-gray-200/50">
                    <a href="">
                      <div className="grid grid-cols-4">
                        <div>
                          <Image
                            src='/image/icon.ico'
                            alt='menu-2'
                            width={100}
                            height={24}
                          />
                        </div>
                        <div className="col-span-3 font-design text-black">
                          <h2 className=" font-bold font-sans">I want to offer Pro sevices</h2>
                          <span>I'd like to work on business projects as a Pro
                            freelancer or
                            agency.</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li><a href="">Explore</a>
                <ul className="sub-menu bg-slate-100">
                  <li className="hover:bg-gray-200/50"><a href="">
                    <div className="text-black font-design">
                      <h2 className="font-bold font-sans">Discover</h2>
                      <span>inspring projects made on Fiverr</span>
                    </div>
                  </a></li>
                  <li className="hover:bg-gray-200/50"><a href="">
                    <div className="text-black font-design">
                      <h2 className="font-bold font-sans">Community</h2>
                      <span>Conect with Fiverr's team and commynity</span>
                    </div>
                  </a></li>
                  <li className="hover:bg-gray-200/50"><a href="">
                    <div className="font-design text-black">
                      <h2 className="font-bold font-sans">Guides</h2>
                      <span>In-deth guides covering business topics</span>
                    </div>
                  </a></li>
                  <li className="hover:bg-gray-200/50"><a href="">
                    <div className="font-design text-black">
                      <h2 className="font-bold font-sans">Podcast</h2>
                      <span>Inside tips from top business minds</span>
                    </div>
                  </a></li>
                  <li className="hover:bg-gray-200/50"><a href="">
                    <div className="font-design text-black">
                      <h2 className="font-bold font-sans">Learn</h2>
                      <span>Professional online courses, led by experts</span>
                    </div>
                  </a></li>
                  <li className="hover:bg-gray-200/50"><a href="">
                    <div className="font-design text-black">
                      <h2 className="font-bold font-sans">Blog</h2>
                      <span>News, information and community stories</span>
                    </div>
                  </a></li>
                  <li className="hover:bg-gray-200/50"><a href="">
                    <div className="font-design text-black">
                      <h2 className="font-bold font-sans">Logo Maker</h2>
                      <span>Create your logo instantly</span>
                    </div>
                  </a></li>
                  <li className="hover:bg-gray-200/50"><a href="">
                    <div className="font-design text-black">
                      <h2 className="font-bold font-sans">Fiverr Workspace</h2>
                      <span>one place to manage your business</span>
                    </div>
                  </a></li>
                </ul>
              </li>
              <li><a href="">English</a></li>
              <li><a href="">Become a Seller</a></li>
              <li><a href="" className="hover:bg-green-400/50 border-solid rounded-full">Sign in</a></li>
              <li><a href="" className="hover:bg-green-400/50 border-solid rounded-full">Log Out</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-52 w-full pl-10 text-indigo-50">
          <span className="text-5xl">Find the right freelane <br />
            service, right away <br />
          </span>
          <input className="border-4 w-8/12 mt-3" type="search" placeholder="Search for any service..." />

          <div className="text-sm flex flex-row gap-2 text-center mt-3 text-white">
            <span className="p-2">Popular :</span>
            <button
              className="p-2 border-2 border-solid rounded-full border-white hover:bg-slate-100 hover:text-black text-center">Website
              Design</button>
            <button
              className="p-2 border-2 border-solid rounded-full border-white hover:bg-slate-100 hover:text-black text-center">WordPress</button>
            <button
              className="p-2 border-2 border-solid rounded-full border-white  hover:bg-slate-100 hover:text-black text-center">Logo
              Design</button>
            <button
              className="p-2 border-2 border-solid rounded-full border-white  hover:bg-slate-100 hover:text-black text-center">AI
              service</button>
          </div>
        </div>
        <div className="mt-32 flex space-x-4 place-content-center gap-8 bg-gray-300 text-slate-700/50">
          <span>TRUST BY</span>
          <span>META</span>
          <span>Google</span>
          <span>Netfix</span>
          <span>P&G</span>
          <span>PayPal</span>
        </div>
      </div>


      <div className="bg-white max-h-96 mt-28">
        <div className="pl-10">
          <h1 className="text-4xl text-black">Popular Service</h1>
        </div>
        <div className="responsive mt-5 px-20 relative">
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 1</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 2</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 3</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 4</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 5</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 6</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 7</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 8</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 9</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
          <div className="font-black hover:opacity-80">
            <h2 className="text-shadow px-2">so 10</h2>
            <h1 className="text-shadow px-2">
              AI artists
            </h1>
            <Image
              src='/image/COC-COC.ico'
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
        </div>
        <div className="mt-36  bg-blue-100/50 text-black">
          <div className="flex flex-row max-w-full py-20">
            <div className="w-2/4 flex flex-col gap-4 size-design text-wrap px-32 ">
              <h1 className="font-black text-2xl">The best part? Everything.</h1>
              <div>
                <h4 className="font-black">Stick to your budget</h4>
                <span>Find the right service for every price point. No hourly rates, just project-based
                  pricing.</span>
              </div>

              <div>
                <h4 className="font-black">Get quality work done quickly</h4>
                <span>Hand your project over to a talented freelancer in minutes, get long-lasting
                  results.</span>
              </div>
              <div>
                <h4 className="font-black">Pay when you're happy</h4>
                <span>Upfront quotes mean no surprises. Payments only get released when you approve.</span>
              </div>
              <div>
                <h4 className="font-black">Count on 24/7 support</h4>
                <span>Our round-the-clock support team is available to help anytime, anywhere.</span>
              </div>
            </div>
            <div className="w-2/4 flex justify-items-center px-32">
              <video controls height="720px" width="480px" poster="image/Screenshot 2024-03-30 184723.png">
                <source src="image/vmvv3czyk2ifedefkau7.mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="mt-36 bg-white text-black">
          <div>
            <span className="text-2xl px-32 font-black">You need it, we've got it</span>
          </div>
          <div className="grid grid-cols-5 px-12 relative mt-20">
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110 hover:border-l-4">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/web-design.png'
                    alt="Graphics & Design"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-14">Graphics & Design</span>
              </li>
            </ul>
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/performance.png'
                    alt="Degital Marketing"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-14">Degital Marketing</span>
              </li>
            </ul>
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/contract.png'
                    alt="Writting & Translation"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-14">Writting & Translation</span>
              </li>
            </ul>
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/video-editing.png'
                    alt="Video & Animation"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-14">Video & Animation</span>
              </li>
            </ul>
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/microphone.png'
                    alt="Music & Audio"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-20">Music & Audio</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-5 px-12 relative mt-40">
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/web-programming.png'
                    alt="Program & Tech"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-14">Program & Tech</span>
              </li>
            </ul>
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/handshake.png'
                    alt="business"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-24">business</span>
              </li>
            </ul>
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/tea-cup.png'
                    alt="Lifestyle"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-24">Lifestyle</span>
              </li>
            </ul>
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/folder.png'
                    alt="Data"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-24">Data</span>
              </li>
            </ul>
            <ul className="list-none transition ease-in-out delay-150 hover:scale-110">
              <li className="flex flex-col icon absolute gap-2">
                <a href="" className="pl-20">
                  <Image
                    src='/image/camera.png'
                    alt="Photography"
                    height={100}
                    width={100}
                  />
                </a>
                <span className="size-design pl-20">Photography</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-36">
          <div className="text-white flex flex-col pl-10 pt-4 bg-sky-700">
            <span className="text-xl"><b>Fiverr</b>logomaker</span>
            <span className="font-black mt-4">Make an incredible logo</span>
            <h3>in minutes</h3>
            <span>Pre-designed by top talent. Just add your touch.</span>
            <a className="pb-5" href="">
              <button className="flex text-sky-500 max-w-56 bg-white px-2 mt-4">Try Fiverr Logo Maker</button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

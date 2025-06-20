import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Sidebar from '/src/components/Sidebar';

import JobService from '/src/components/http/job.service';
export default function Job() {

    const navigate = useNavigate();
    const params = useParams();

    const [job, setJob] = useState([]);
    useEffect(() => {
        JobService.getJob(params.id)
            .then(response => { 
                setJob(response.data[0]);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [params]);

    function setReceived() {
        JobService.update(params.id, {status: "received"})
            .then((response) => {
                //navigate(`/orders/${params.poId}`)
                //setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    //console.log(job)
    const button_classname = "grid py-2 px-2 mx-18 md:mx-6 text-center text-sm text-white hover:text-[#544B76] shadow-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-500 border-input bg-[#544B76] hover:bg-[#DEE1F4] rounded-md";

    return (
        <>
            <div className="grid grid-cols-6">
                <div className="mb-8"><Sidebar /></div>
                <div className="col-span-5"> 
                    <div className="grid items-center ml-8 mt-8">
                        {!job ? <></> : <>
                            <div className="grid grid-cols-3 items-center">

                                <div className={"bg-[#eff1fc] mr-8 p-8 mb-8 rounded shadow border border-slate-500"}>
                                    <div className={"bg-white max-w-full mr-2 p-8 rounded shadow border border-slate-500"}>
                                        <div className="flex place-content-between border-b border-slate-500 pb-1">
                                            <div className="text-sm pt-1 font-semibold">{`WE-${job.id}`}</div>
                                            <div className="text-sm pt-1 font-semibold">{`${job.status}`}</div>
                                        </div>

                                        <div className="mt-4 mx-4 flex place-content-between font-semibold">
                                            <div className="flex justify-self-end">{`${job.order?.customer}`}</div>
                                            <div className="flex justify-self-end">{`PO # ${job.order?.po_num}`}</div>
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <div className="py-4">{`Date: ${new Date(job._timestamp).toDateString()}`}</div>
                                            <div className="flex gap-2">Qty: <div className="font-semibold">{job.qty}</div></div>
                                            <div className="font-semibold">{job.process}</div>
                                            <div className="pt-4 text-sm text-red-700">{job.remarks ? `${job.remarks}` : ""}</div>

                                            {job.status !== "incoming" && job.status !== "received"
                                                ? <>
                                                    <div className="pt-4 pb-1 flex gap-4 border-t border-slate-500"> Operator: <div className="font-semibold text-blue-700">{job.tag?.operator_initial}</div></div>
                                                    <div className="flex gap-4 items-center">
                                                        {job.tag?.rack_type ? <> Rack Type: <div className="font-semibold text-blue-700 pr-6 border-r border-slate-500">{job.tag?.rack_type} </div> </> : <></>}
                                                        {job.tag?.diff_level ? <> Difficulty: <div className="font-semibold text-blue-700">{job.tag?.diff_level} </div> </> : <></>}
                                                    </div>
                                                    {job.tag?.operator_notes ? <div className="pt-1 font-semibold text-blue-700">{`-- ${job.tag?.operator_notes}`}</div> : <></>}
                                                </>
                                                : <></>
                                            }
                                            {job.price
                                                ? <>
                                                    <div className="pt-8 pb-1 flex gap-4">
                                                        <p className="text-red-700">Price:</p>
                                                        {job.price}
                                                    </div>
                                                </>
                                                : <></>
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className="place-content-between pr-8">
                                    {job.status == "received" || job.status == "delivered-partial"
                                        ? <>
                                            <div className="my-12 pr-8 border-l grid">
                                                <Link className={button_classname + " bg-blue-800"} to={`update`}>
                                                    Finish Job
                                                </Link>
                                            </div>
                                            <div></div>
                                         </> : <></>
                                    }
                                    {job.status == "incoming"
                                        ? <>
                                            <div className="my-8 pr-8 border-l grid">
                                                <Link className={button_classname} to={`print`} onClick={setReceived}>
                                                    Print Tag
                                                </Link>
                                            </div>
                                        </> : <></>
                                    }
                                    <div className="my-8 pr-8 border-l grid">
                                        <Link className={button_classname} to={`/orders/${job.po_id}`}>
                                            Go to PO
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </>
    );
}

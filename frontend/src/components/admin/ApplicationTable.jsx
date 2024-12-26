import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Check, MoreHorizontal, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATIO_END_POINT } from "@/utils/constant";
import { setApplicants } from "@/redux/applicationslice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ApplicationTable = () => {
  const status = ["accepted", "rejected"];
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchallApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATIO_END_POINT}/${jobId}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          // console.log(res.data.job[0].application); // all application related to a particular job
          dispatch(setApplicants(res.data.job[0].application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchallApplicants();
  }, []);
  const applications = useSelector((store) => store.application.applicants); // store mein applicants naam de diya hun applications ko
  // console.log(applications);
  const statusHandler = async (id, status) => {
    try {
      const res = await axios.put(
        `${APPLICATIO_END_POINT}/status/${id}/update`,
        {status},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>Alist of recent Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Fullname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className="text-right">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.length > 0 ? (
            applications.map((application) => {
              return (
                <TableRow key={application._id}>
                  <TableCell className="font-bold">
                    {application?.applicant?.fullname}
                  </TableCell>
                  <TableCell>
                    <a
                      className="text-blue-700"
                      href={`mailto:${application?.applicant?.email}`}
                    >
                      {application?.applicant?.email}
                    </a>{" "}
                  </TableCell>
                  <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {application?.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-700"
                        target="blank"
                        href={application?.applicant?.profile?.resume}
                      >
                        {application?.applicant?.profile?.resumeoriginalname}
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {application?.applicant?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger className="float-right">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 px-2 py-1 ">
                        {status.map((s, index) => {
                          return (
                            <div
                              onClick={(e) => {
                                // console.log(s);
                                statusHandler(application._id, s);
                              }}
                              className="flex items-center gap-x-4"
                              key={index}
                            >
                              <span
                                className={`mb-2 cursor-pointer ${
                                  s === "accepted"
                                    ? "hover:text-green-600"
                                    : "hover:text-red-600"
                                }`}
                              >
                                {s}
                              </span>
                              <span>
                                {s === "accepted" ? (
                                  <Check className="font-bold h-5 text-green-700" />
                                ) : (
                                  <X className="font-bold h-5 text-red-600" />
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                className="text-center text-red-600 font-semibold text-sm"
                colSpan={6}
              >
                *There is no applicatns applied for this job till Now.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;

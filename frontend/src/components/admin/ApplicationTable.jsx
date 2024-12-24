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
  console.log(applications);
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
                  <TableCell className="font-bold">{application?.applicant?.fullname}</TableCell>
                  <TableCell><a className="text-blue-700" href={`mailto:${application?.applicant?.email}`}>{application?.applicant?.email}</a> </TableCell>
                  <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                  <TableCell> <a className="text-blue-700" target="blank" href={application?.applicant?.profile?.resume}>{application?.applicant?.profile?.resumeoriginalname}</a> </TableCell>
                  <TableCell>{application?.applicant?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger className="float-right">
                        <MoreHorizontal/>
                      </PopoverTrigger>
                      <PopoverContent className="w-32 px-2 py-1 ">
                        {status.map((s, index) => {
                          return (
                            <div
                              className="flex items-center gap-x-4"
                              key={index}
                            >
                              <span className="mb-2 cursor-pointer">{s}</span>
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
            <span>hello</span>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;

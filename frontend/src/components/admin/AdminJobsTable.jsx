import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ClipboardX,Eye, MoreHorizontal} from "lucide-react";
import { useSelector } from "react-redux";
import useGetallcompany from "@/hooks/useGetallcompany";
import { useNavigate } from "react-router-dom";
import useGetAllAdminjobs from "@/hooks/useGetAllAdminjobs";

const AdminJobsTable = () => {
  useGetAllAdminjobs();
  const allAdminjobs = useSelector((store) => store.job.allAdminjobs);
  const [filteredjobs, setFilteredjobs] = useState(allAdminjobs);
  
  const searchtext = useSelector((store) => store.job.searchJobBytext);
  // console.log(searchtext);
  const navigate = useNavigate();
  useEffect(() => {
    const tempjobs =
      allAdminjobs.length > 0 &&
      allAdminjobs.filter((job) => {
        if (!searchtext) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchtext?.toLowerCase()) ||
          job?.company?.name?.toLowerCase().includes(searchtext.toLowerCase())
        );
      });
    setFilteredjobs(tempjobs);
  }, [allAdminjobs, searchtext]);
  return (
    <div className="max-w-3xl  mx-auto
        px-4 sm:px-6 lg:px-8 py-6 ">
      <Table className=" border shadow-2xl rounded-lg  overflow-x-auto">
        <TableCaption className="caption-top text-lg font-semibold mb-4">A list of your recent posted jobs <br /> <span className="text-red-800 font-semibold text-xs">* to post a job first Register a Company , if Not Registered yet.</span> </TableCaption>
        <TableHeader>
          <TableRow className="border-b border-gray-300">
            <TableCell className="text-sm font-medium text-gray-700">Company name</TableCell>
            <TableCell className="text-sm font-medium text-gray-700">Role</TableCell>
            <TableCell className="hidden sm:flex text-sm font-medium text-gray-700">Date</TableCell>
            <TableCell className="text-right text-sm font-medium text-gray-700">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAdminjobs.length <= 0 ? (
            <span className="text-red-700 text-sm font-semibold text-center" >*You haven't posted any Job yet.</span>
          ) : (
            filteredjobs.map((job) => {
              return (
                <TableRow>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell className="hidden sm:flex">{job?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover >
                      <PopoverTrigger>
                        <MoreHorizontal   />
                      </PopoverTrigger>
                      <PopoverContent className="w-fit px-3 py-2">
                        <div
                          
                          className="flex items-center gap-x-2 hover:text-gray-500 cursor-default"
                        >
                          <ClipboardX className="h-4"/>
                          <span>Delete</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-x-2 cursor-pointer mt-2 hover:text-purple-900 transform transition-all hover:font-medium "
                        >
                          <Eye className="h-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;

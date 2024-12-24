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
import { CookingPot, Edit2, Eye, MoreHorizontal } from "lucide-react";
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
    <div className="max-w-3xl mx-auto">
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Company name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className="text-right">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAdminjobs.length <= 0 ? (
            <span>You haven't registerd any Company yet.</span>
          ) : (
            filteredjobs.map((job) => {
              return (
                <TableRow>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-fit px-3 py-2">
                        <div
                          onClick={() =>
                            navigate(`/admin/company/create/${job._id}`)  // i have to fix it
                          }
                          className="flex items-center gap-x-2 cursor-pointer"
                        >
                          <Edit2 className="h-4"/>
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-x-2 cursor-pointer mt-2"
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

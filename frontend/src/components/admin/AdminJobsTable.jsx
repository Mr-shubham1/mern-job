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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import useGetallcompany from "@/hooks/useGetallcompany";
import { useNavigate } from "react-router-dom";
import useGetAllAdminjobs from "@/hooks/useGetAllAdminjobs";

const AdminJobsTable = () => {
  useGetAllAdminjobs();
//   const companies = useSelector((store) => store.company.allCompany);
  const allAdminjobs = useSelector((store) => store.job.allAdminjobs);
//   const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [filteredjobs, setFilteredjobs] = useState(allAdminjobs);
  // console.log(companies);
  const searchtext = useSelector((store) => store.company.searchJobBytext);
  // console.log(searchtext);
  const navigate = useNavigate();
  useEffect(() => {
    const tempjobs =
      allAdminjobs.length > 0 &&
      allAdminjobs.filter((job) => {
        if (!searchtext) {
          return true;
        }
        return job?.name?.toLowerCase().includes(searchtext?.toLowerCase());
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
                  <TableCell>job</TableCell>
                  <TableCell>hello</TableCell>
                  <TableCell>job</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-fit px-4 py-2">
                        <div
                          onClick={() =>
                            navigate(`/admin/company/create/${company._id}`)
                          }
                          className="flex items-center gap-x-6 cursor-pointer"
                        >
                          <Edit2 />
                          <span>Edit</span>
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

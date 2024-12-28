import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import useGetappliedjobs from "@/hooks/useGetappliedjobs";
import { useSelector } from "react-redux";
import { SpaceIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppliedJobTable = () => {
  useGetappliedjobs();
  const navigate = useNavigate();
  const appliedjobs = useSelector((store) => store.job.appliedjobs);
  // console.log(appliedjobs);
  return (
    <div className="mb-2">
      <Table>
        <TableCaption>A list of your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedjobs.length>0 ? appliedjobs?.map((appliedjob) => (
            <TableRow className="cursor-pointer" onClick={(e)=>navigate(`/description/${appliedjob?.job?._id}`)} key={appliedjob._id}>
              <TableCell className="font-medium ">
                {new Date(appliedjob?.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-center">{appliedjob?.job?.title}</TableCell>
              <TableCell className="text-center">{appliedjob?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge className={`${appliedjob?.status==="accepted"?"text-green-600 bg-green-200":appliedjob.status==="rejected"?"text-red-600 bg-red-200":"text-yellow-500 bg-yellow-100"}`}>{appliedjob?.status}</Badge>
              </TableCell>
            </TableRow>
          )):
          <TableRow>
            <TableCell className="text-center text-red-500 font-semibold text-sm" colspan ={4}>
            *you haven't applied for any jobs yet.
            </TableCell>
          </TableRow>
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;

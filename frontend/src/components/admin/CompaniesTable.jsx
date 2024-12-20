import React from "react";
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

const CompaniesTable = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className="text-right">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={
                  "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                }
                alt="@shadcn"
              />
            </Avatar>
          </TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>20/12/2024</TableCell>
          <TableCell className="text-right">
            <Popover>
              <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
              <PopoverContent className="w-fit px-4 py-2">
                <div className="flex items-center gap-x-6 cursor-pointer">
                  <Edit2/>
                  <span>Edit</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;

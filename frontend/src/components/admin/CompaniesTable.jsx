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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import useGetallcompany from "@/hooks/useGetallcompany";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  useGetallcompany();
  const companies = useSelector((store) => store.company.allCompany);
  const [filteredCompanies,setFilteredCompanies] = useState(companies);
  // console.log(companies);
  const searchtext = useSelector(store=>store.company.searchCompanyBytext);
  // console.log(searchtext);
  const navigate = useNavigate();
  useEffect(()=>{
    const tempcompanies = companies.length>0 && companies.filter((company)=>{
      if(!searchtext){
        return true;
      }
      return company?.name?.toLowerCase().includes(searchtext?.toLowerCase());
    }) ;
    setFilteredCompanies(tempcompanies);
  },[companies,searchtext])
  return (
    <div className="max-w-3xl  mx-auto
        px-4 sm:px-6 lg:px-8 py-6 ">
      <Table className=" border shadow-2xl rounded-lg  overflow-x-auto">
        <TableCaption className="caption-top text-lg font-semibold mb-4">A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-gray-300">
            <TableCell className="text-sm font-medium text-gray-700">Logo</TableCell>
            <TableCell className="text-sm font-medium text-gray-700">Name</TableCell>
            <TableCell className="text-sm font-medium text-gray-700 hidden sm:flex">Date</TableCell>
            <TableCell className="text-right text-sm font-medium text-gray-700">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length <= 0 ? (
            <span>You haven't registerd any Company yet.</span>
          ) : (
            filteredCompanies.map((company) => {
              return (
                <TableRow>
                  <TableCell>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          company?.logo
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company?.name}</TableCell>
                  <TableCell className="hidden sm:flex">{company?.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-fit px-3 py-2">
                        <div onClick={()=>navigate(`/admin/company/create/${company._id}`)} className="flex items-center gap-x-4 cursor-pointer">
                          <Edit2 className="h-4"/>
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

export default CompaniesTable;

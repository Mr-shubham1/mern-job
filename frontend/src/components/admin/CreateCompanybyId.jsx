import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Form, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companyslice";
import { useDispatch, useSelector } from "react-redux";
import useGetcompanyById from "@/hooks/useGetcompanyById";

const CreateCompanybyId = () => {
  const params = useParams();
  const companyId = params.id;
  useGetcompanyById(companyId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleCompany = useSelector((store) => store.company.singleCompany);
  // console.log(singleCompany.name);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const onChangeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData();
    if (input.name) {
      formdata.append("name", input.name);
    }
    if (input.description) {
      formdata.append("description", input.description);
    }
    if (input.website) {
      formdata.append("website", input.website);
    }
    if (input.location) {
      formdata.append("location", input.location);
    }
    if (input.file) {
      formdata.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_END_POINT}/update/${companyId}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/formdata",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setLoading(false);
        toast(res.data.message);
        // console.log(res.data.company);
        dispatch(setSingleCompany(res.data.company));
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description:singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file||null,
    });
  }, [singleCompany]);
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-6 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center w-fit gap-x-3 px-3 text-gray-700 font-semi-bold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-bold">Company Setup</h1>
          </div>

          <div className="mb-4 grid grid-cols-5 items-center">
            <Label className="col-span-2">Company name</Label>
            <Input
              className="mt-2 border-2 border-gray-500 col-span-3"
              type="text"
              name="name"
              onChange={onChangeEventHandler}
              value={input.name}
            />
          </div>
          <div className="mb-4 grid grid-cols-5">
            <Label className="col-span-2 mt-4">Description</Label>
            <textarea
              className="mt-2 border-2 border-gray-500 col-span-3 h-20"
              name="description"
              onChange={onChangeEventHandler}
              value={input.description}
            />
          </div>
          <div className="mb-4 grid grid-cols-5 items-center">
            <Label className="col-span-2 ">Website</Label>
            <Input
              className="mt-2 border-2 border-gray-500 col-span-3"
              type="text"
              name="website"
              onChange={onChangeEventHandler}
              value={input.website}
            />
          </div>
          <div className="mb-4 grid grid-cols-5 items-center">
            <Label className="col-span-2 ">Location</Label>
            <Input
              className="mt-2 border-2 border-gray-500 col-span-3"
              type="text"
              name="location"
              onChange={onChangeEventHandler}
              value={input.location}
            />
          </div>
          <div className="mb-4 grid grid-cols-5 items-center">
            <Label className="col-span-2 ">Logo</Label>
            <Input
              className="mt-2 border-2 border-gray-500 col-span-3 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
          </div>
          <Button type="submit" className="w-full mx-auto mt-4">
            {!loading ? "Update" : <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanybyId;

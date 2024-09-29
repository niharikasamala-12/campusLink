"use client"
import Sidebar from "@/components/Sidebar";
import Head from "@/components/Head";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
const AdminWork: React.FC = () => {
  
  const { data: session } = useSession();
  const sessions = (session?.user as { id?: string })?.id 
  const [title , setTitle] = useState("")
  const [desc , setDesc] = useState("")
  const [minSal , setMinSal] = useState(0)
  const [maxSal , setMaxSal] = useState(0)

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value)
  }


  const handleMinSal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSal(Number(e.target.value))
  }

  const handleMaxSal = (e : React.ChangeEvent<HTMLInputElement>) => {
    setMaxSal(Number(e.target.value))
  }

  const handleSubmit = async(e : React.FormEvent) => {
    e.preventDefault()
    console.log("click")
    
    

    console.log(sessions)

    const formData = {
      title,
      desc,
      minSal,
      maxSal,
      sessionEmail: session?.user?.email
    }

    try {
      const response = await axios.post('/api/auth/adminWorkRoute', formData)
      console.log(response.data)
      
    } catch (error) {
      console.log("error submitting form", error)
    }
}

  
  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
     
      <div className="flex absolute top-0 left-[95px] bg-white border-b-2 h-20 w-[calc(100%-90px)] z-30">
        <Head text="Post-Gig" />
      </div>

      
      <div className="fixed top-0 left-0 h-screen w-[120px] z-20">
      <Sidebar url1="/api/adminHome" url2="/api/adminWork" url3="/api/adminProjects" url4="/api/showSt"/>
      </div>

     
      <div className="flex-1 ml-[120px] mt-20 p-6 flex items-center w-screen">
        <Card className="w-[calc(100%-120px)]">
          <CardHeader>
            <CardTitle>Post a New Gig</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}  className=" space-y-4">
              
              <div>
                <Label htmlFor="title">Title of the Work</Label>
                <Input id="title" type="text" placeholder="Enter the title" value={title} onChange={handleTitle}/>
              </div>

              
              <div>
                <Label htmlFor="description">Description of the Work</Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of the work"
                  rows={7}
                  value={desc}
                  onChange={handleDesc}
                  className="w-full text-sm p-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              
              <div className="flex items-center gap-2">
                <Label htmlFor="salaryMin">Salary Range</Label>
                <div className="flex items-center">
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="Min"
                    className="w-24"
                    value={minSal}
                    onChange={handleMinSal}
                  />
                  <span className="mx-2">-</span>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="Max"
                    value={maxSal}
                    onChange={handleMaxSal}
                    className="w-24"
                  />
                </div>
              </div>

              <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminWork;

"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PatientFormSchema } from "@/lib/validations/PatientFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, z } from "zod";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import getFamiliesData from "../mockData/getfamiles";

const PatientInfoStepForm = () => {
  // interface FamiliesIds {
  //   [key: string]: { name: string; franchiseeID: string };
  // }

  const { toast } = useToast();
  const [designation, setDesignation] = useState("Mr.");
  const [gender, setGender] = useState("Male");
  const [familiesIds, setFamiliesIds] = useState<{ id: string, name: string }[]>([]); //[key: string]: string | number; }
  // const { data: session } = useSession();
  const form = useForm<z.infer<typeof PatientFormSchema>>({
    defaultValues: {
      familyId: "",
      franchiseeId: "",
      patientName: "",
      PhoneNumber: "",
      Email: "",
      Address: "",
      City: "",
      State: "",
      District: "",
      PinCode: "",
      Country: "",
      passportNumber: "",
      AadharNumber: "",
    },
    resolver: zodResolver(PatientFormSchema),
  });

  // const getFranchisees = async () => {
  //   try {
  //     // const response = await fetch("api/franchisor/franchisee", {
  //     const baseUrl = process.env.NEXT_PUBLIC_URL
  //     const response = await fetch(`${baseUrl}/api/franchisor/franchisee`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${session?.user.accessToken}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch roles");
  //     }
  //     const franchisees = await response.json();
  //     const franchiseesIds = franchisees.reduce(
  //       (
  //         obj: { [x: string]: any },
  //         role: { id: string | number; branchTitle: any }
  //       ) => {
  //         obj[role.id] = role.branchTitle;
  //         return obj;
  //       },
  //       {}
  //     );
  //     setFranchiseesIds(franchiseesIds);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  /**
   * The function `getFamilies` makes an asynchronous request to fetch a list of families from an API
   * and sets the fetched data in the state.
   */
  const getFamilies = async () => {
    const families = await getFamiliesData()
    console.log(families);

    // try {
    //   const baseUrl = process.env.NEXT_PUBLIC_URL
    //   // const response = await fetch("api/franchisor/getFamilies", {
    //   const response = await fetch(`${baseUrl}/api/franchisee/getFamilies`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${session?.user.accessToken}`,
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to fetch roles");
    //   }
    //   const families = await response.json();
    //   const familiesIds = families.reduce(
    //     (
    //       obj: { [x: string]: any },
    //       role: {
    //         id: string | number;
    //         name: any;
    //         franchiseeID: string;
    //       }
    //     ) => {
    //       obj[role.id] = { name: role.name, franchiseeID: role.franchiseeID };
    //       return obj;
    //     },
    //     {}
    //   );
    //   setFamiliesIds(familiesIds);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    getFamilies();
    // getFranchisees();
  }, []);

  useEffect(() => {
    const selectedFamilyId = form.getValues("familyId");
    const selectedFranchiseeId = form.getValues("franchiseeId");

    // Update franchiseeId if familyId changes and franchiseeId is selected
    if (selectedFamilyId && selectedFranchiseeId) {
      form.setValue("franchiseeId", "");
    }
  }, [form.getValues("familyId")]);

  const handleDesignationChange = (value: string) => {
    setDesignation(value);
    if (value === "Mr.") {
      setGender("Male");
    } else if (value === "Mrs." || value === "Ms.") {
      setGender("Female");
    }
  };

  const onFinish = async (values: z.infer<typeof PatientFormSchema>) => {
    // console.log("values", values, "designation", designation, "gender", gender);
    // const fullName = designation + values.patientName;
    // console.log("fullName", fullName);
    // console.log("franchiseeId in form", form.getValues("franchiseeId"));
    const completeAddress =
      values.Address +
      " " +
      values.City +
      " " +
      values.State +
      " " +
      values.PinCode +
      " " +
      values.Country;
    console.log("completeAddress", completeAddress);
    console.log("values", values);


    // const response = await fetch("api/franchisor/createPatient", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${session?.user.accessToken}`,
    //   },
    //   body: JSON.stringify({
    //     name: fullName,
    //     email: values.Email,
    //     phone: values.PhoneNumber,
    //     address: completeAddress,
    //     gender: gender,
    //     PassportNumber: values.passportNumber,
    //     AadharNumber: values.AadharNumber,
    //     familyId: values.familyId,
    //     franchiseeId: values.franchiseeId,
    //   }),
    // });
    // console.log("response", response);
    // const data = await response.json();
    // console.log("data", data);
    // if (data.message === "patient created succesfully") {
    //   toast({
    //     title: "Success",
    //     description: "patient created succesfully",
    //   });
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description:
    //       "Error creating patient, check if all the fields are entered correctly",
    //   });
    // }
    // form.reset();
  };

  return (
    <>

      <ScrollArea className="h-[550px] w-[635px] px-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFinish)}
            className="space-y-5 space-x-3"
          >
            <FormField
              control={form.control}
              name="familyId"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>
                    Select your family name (optional)
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-5/6 ml-2 ">
                          <SelectValue placeholder="Select your family name" />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-[200px]">
                            <SelectGroup>
                              <SelectLabel>Families</SelectLabel>
                              {
                                familiesIds.map((family) => {
                                  console.log(family);
                                  return (<SelectItem
                                    key={family.id}
                                    value={family.name}
                                  >
                                    {family.name}
                                  </SelectItem>)
                                }
                                )
                              }
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />


            <div className="flex flex-row">
              <FormItem className="w-[120px]">
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={handleDesignationChange}
                    value={designation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Mr." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Mr.">Mr.</SelectItem>
                        <SelectItem value="Mrs.">Mrs.</SelectItem>
                        <SelectItem value="Ms.">Ms.</SelectItem>
                        <SelectItem value="Dr.">Dr.</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem className="w-3/5 ml-6">
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="Gender"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value: any) => setGender(value)}
                      value={gender}
                      className="flex flex-row space-x-2"
                    >
                      <FormItem className="flex items-center ">
                        <FormControl>
                          <RadioGroupItem value="Male" />
                        </FormControl>
                        <FormLabel className="font-normal px-2">
                          Male
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center ">
                        <FormControl>
                          <RadioGroupItem value="Female" />
                        </FormControl>
                        <FormLabel className="font-normal px-2">
                          Female
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PhoneNumber"
              render={({ field }) => (
                <FormItem className="w-5/6">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number.."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem className="w-5/6">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="enter email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Address"
              render={({ field }) => (
                <FormItem className="w-5/6">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="enter address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row">
              <FormField
                control={form.control}
                name="City"
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="enter city..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="State"
                render={({ field }) => (
                  <FormItem className="w-2/5 ml-6">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="enter state..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row">
              <FormField
                control={form.control}
                name="District"
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="enter district..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="PinCode"
                render={({ field }) => (
                  <FormItem className="w-2/5 ml-6">
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input placeholder="enter pincode..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="Country"
              render={({ field }) => (
                <FormItem className="w-5/6">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="enter country..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem className="w-5/6">
                  <FormLabel>Passport Number (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter passport number..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="AadharNumber"
              render={({ field }) => (
                <FormItem className="w-5/6">
                  <FormLabel>Aadhar Number (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter aadhar number..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </ScrollArea>
    </>
  );
};

export default PatientInfoStepForm;

import { z } from "zod";

const phoneRegex = new RegExp( /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/)
let aadharRegex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
const passportRegex = new RegExp( /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/)

export const PatientFormSchema = z.object({
  patientName: z.string().nonempty("Patient Name is required"),
  PhoneNumber: z
    .string()
    .nonempty("Phone Number is required")
    .regex(phoneRegex, "Invalid phone number format"),
  Email: z.string(),
  Address: z.string().nonempty("Address is required"),
  City: z.string().nonempty("City is required"),
  State: z.string().nonempty("State is required"),
  District: z.string().nonempty("District is required"),
  PinCode: z.string().nonempty("Pin Code is required"),
  Country: z.string().nonempty("Country is required"),
  passportNumber: z.string(),
  AadharNumber: z.string(),
  franchiseeId: z.string(),
  familyId: z.string(),
});

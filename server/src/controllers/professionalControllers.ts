import { Request, Response } from "express";
import Professional, { ProfessionalDocument } from "../models/Professional";
import { catchError } from "../Util/errorCatch";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// the controller for the first time professional join requests tha will be later processed and approved by the admin
export const registrationRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    CIN,
    license,
    username,
    email,
    phoneNumber,
    address,
    servicesProvided,
  } = req.body;
  try {
    const professional: ProfessionalDocument | null =
      await Professional.findOne({ CIN: CIN });
    if (professional) {
      res
        .status(409)
        .json({
          message: "a request with the prvided information alreadi in process",
        });
    } else {
      const newProfessional = new Professional({
        CIN,
        license,
        username,
        email,
        phoneNumber,
        address,
        servicesProvided,
      });
      const savenewProfessional = await newProfessional.save();
      if (savenewProfessional) {
        res
          .status(201)
          .json({
            message:
              "your request is successfully submitted, we will process it and get back to you as soon as possible ",
          });
      } else {
        res
          .status(500)
          .json({ message: "internal server error , please try again later" });
      }
    }
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};

export const registrationApproval = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, temporaryPassword, approvalStatus, reason, permissions } =
    req.body;
  try {
    const professional = await Professional.findById(id);
    if (!professional) {
      res.status(404).json({ message: "cannot find any ongoing request" });
    } else {
      professional.approved.approvalStatus = approvalStatus;
      professional.approved.reason = reason;
      professional.password = temporaryPassword;
      professional.permissions = permissions;
      const updatePro = await professional.save();
      if (!updatePro) {
        res
          .status(500)
          .json({
            message: "cannot update the information , please try again",
          });
      } else {
        res.status(201).json({ message: "status updated successfuly" });
      }
    }
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const professional: ProfessionalDocument | null =
      await Professional.findOne({ email });
    if (!professional) {
      res.status(404).json({ message: "can't find any pro account " });
    } else {
      const PasswordsMatch: boolean = await bcrypt.compare(
        oldPassword,
        newPassword
      );
      if (!PasswordsMatch) {
        res.status(400).json({ message: "invalid credencials" });
      } else {
        professional.password = newPassword;
      }
    }
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};

export const professionalLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const professional: ProfessionalDocument | null =
      await Professional.findOne({ email });
    if (!professional) {
      res.status(404).json({ message: "can't find any pro account " });
    } else if (professional && professional.approved.approvalStatus) {
      const PasswordsMatch: boolean = await bcrypt.compare(
          password,
        professional.password
      );
      if (PasswordsMatch) {
        const payload = {
          id: professional.id,
          username: professional.username,
          type: "professional",
        };
        const key = process.env.SECRET || "bsd25hgGG2156ljhcv";

        jwt.sign(
          payload,
          key,
          (err: Error | null, token: string | undefined) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .json({ message: "failed to complete the sing in process" });
            } else {
              res.status(200).json({
                success: true,
                user: professional,
                token: "Bearer " + token,
              });
            }
          }
        );
      } else {
        res.status(400).json({ msg: "invalid credencials" });
      }
    } else {
      res
        .status(403)
        .json({ message: "the requested account cannot be accessed" });
    }
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};

import { Response } from "express";
import Patient from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { IRegisteredFamilyMember } from "../../models/patients/interfaces/IRegisteredFamilyMember";
import { Relation } from "../../models/patients/Patient";

export const addPatientRegisteredFamilyMember = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const relation = req.body.relation;

  try {
    // Find the requesting patient
    const requestingPatient = await Patient.findById(patientId).select(
      "+registeredFamilyMembers +registeredFamilyMemberRequests"
    );

    let query: any = {};

    if (email) {
      query.email = email;
    }
    if (mobile) {
      query.mobileNumber = mobile;
    }

    const familyMember = await Patient.findOne(query);

    if (!familyMember) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No patient with the entered details was found" });
    }

    if (familyMember.id === requestingPatient!.id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "You cannot add yourself as a family member" });
    }

    const registeredFamilyMember: IRegisteredFamilyMember = {
      id: familyMember!.id,
      relation,
    };

    const requestingFamilyMemberRelation =
      relation == "husband"
        ? "wife"
        : relation == "wife"
        ? "husband"
        : "parent";

    const requestingFamilyMember: IRegisteredFamilyMember = {
      id: requestingPatient!.id,
      relation:
        Relation[
          requestingFamilyMemberRelation.toUpperCase() as keyof typeof Relation
        ],
    };

    // Initialize registeredFamilyMembers to an empty array if it is undefined
    if (!requestingPatient!.registeredFamilyMembers) {
      requestingPatient!.registeredFamilyMembers = [];
    }

    // Check if the family member already exists in the registeredFamilyMembers array
    if (
      requestingPatient!.registeredFamilyMembers.some(
        (member) => member.id.toString() === familyMember!.id.toString()
      )
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `${familyMember.name} is already registered as a family member`,
      });
    }

    // Delete the family member from the requesting patient's registered family member requests
    if (requestingPatient!.registeredFamilyMemberRequests) {
      requestingPatient!.registeredFamilyMemberRequests =
        requestingPatient!.registeredFamilyMemberRequests.filter(
          (member) => member.id.toString() !== familyMember!.id.toString()
        );
    }
    // Add the family member to the requesting patient's registered family members
    requestingPatient!.registeredFamilyMembers.push(registeredFamilyMember);

    await requestingPatient!.save();

    if (!familyMember!.registeredFamilyMemberRequests) {
      familyMember!.registeredFamilyMemberRequests = [];
    }

    if (
      !familyMember!.registeredFamilyMemberRequests.some(
        (member) => member.id.toString() === requestingPatient!.id.toString()
      )
    ) {
      familyMember!.registeredFamilyMemberRequests.push(requestingFamilyMember);
    }

    await familyMember!.save();

    res.status(StatusCodes.OK).json({
      message: `${familyMember.name} has been added as a registered family member`,
    });
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
    console.log(error);
  }
};

export const deletePatientRegisteredFamilyMember = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const familyMemberId = req.params.familyMemberId;
  const patientId = req.user?.id;

  // Find the requesting patient
  const requestingPatient = await Patient.findById(patientId).select(
    "+registeredFamilyMembers"
  );
  const familyMember = await Patient.findById(familyMemberId);
  if (requestingPatient?.registeredFamilyMembers) {
    try {
      requestingPatient.registeredFamilyMembers =
        requestingPatient.registeredFamilyMembers.filter(
          (member) => member.id.toString() !== familyMemberId
        );
      await requestingPatient.save();
    } catch (error) {
      console.log(error);
    }

    if (!familyMember?.registeredFamilyMemberRequests) return;
    try {
      familyMember.registeredFamilyMemberRequests =
        familyMember.registeredFamilyMemberRequests.filter(
          (member) => member.id.toString() !== patientId
        );
      await familyMember.save();

      res
        .status(StatusCodes.OK)
        .json({ message: "Family member has been removed" });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};

export const rejectPatientRegisteredFamilyMember = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const familyMemberId = req.params.familyMemberId;
  const patientId = req.user?.id;

  // Find the requesting patient
  const requestingPatient = await Patient.findById(patientId).select(
    "+registeredFamilyMemberRequests"
  );

  if (requestingPatient?.registeredFamilyMemberRequests) {
    try {
      requestingPatient.registeredFamilyMemberRequests =
        requestingPatient.registeredFamilyMemberRequests.filter(
          (member) => member.id.toString() !== familyMemberId
        );
      await requestingPatient.save();
    } catch (error) {
      console.log(error);
    }
  }
};

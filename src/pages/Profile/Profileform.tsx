import React, {useEffect, useState} from 'react';
import './Profileform.css';
import '../../common/InputField.css';
import Button from "../../common/Button";
import InputField from "../../common/InputField";
import * as Yup from "yup";
import {Formik} from 'formik';
import Picture from "./Picture";
import {atom, useRecoilState, useResetRecoilState} from "recoil";
import {withRouter, RouteComponentProps, useParams, useHistory, useLocation} from "react-router-dom";

export const RANDOMUSER = false;  //wip randomUser usage of data

export enum StepTypes {
    EDIT = "edit",
    VIEW = "view",
    CREATE = "create",
}


export type Props = RouteComponentProps<{ id: string }>;
export const route: string = "/profile/:step";

const transientUserAtom = atom({
    key: "transientUser-atom",
    default: {
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        houseNr: "",
        zipCode: "",
        city: "",
    }
})

const createdUserAtom = atom({
    key: "createdUser-atom",
    default: {
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        houseNr: "",
        zipCode: "",
        city: "",
    }
})


const ProfileformComponent: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const location = useLocation();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        houseNr: "",
        zipCode: "",
        city: "",
    };

    const validationSchema = () => {
        return Yup.object().shape({
            firstName: Yup.string().trim().required().min(2, "Too short"),
            lastName: Yup.string().trim().min(2, "Too short").required(),
            email: Yup.string()
                .trim()
                .email("Email not valid")
                .required("Field required"),
            street: Yup.string().trim().min(2, "Too short").required(),
            houseNr: Yup.string().trim().required(),
            zipCode: Yup.string().trim()
                .required()
                .matches(/^[0-9]+$/, "Only digits")//https://stackoverflow.com/questions/49886881/validation-using-yup-to-check-string-or-number-length
                .min(5, 'Min 5 in length')
                .max(5, 'Max 5 in length'),
            city: Yup.string().min(2, "Too short").required(),

        });
    };

    const {step} = useParams<{ step: StepTypes }>();

    const [isValid, setIsValid] = useState<boolean>(false);
    const [randomUser, setRandomUser] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const [transientUser, setTransientUser] = useRecoilState(transientUserAtom);
    const [createdUser, setCreatedUser] = useRecoilState(createdUserAtom);
    const resetTransientUser = useResetRecoilState(transientUserAtom);


    const handleBlur = (values: any) => {
        setTransientUser(values);
    }


    useEffect(() => {
        window.localStorage.setItem("transientUser", JSON.stringify(transientUser));
    })
    useEffect(() => {
        window.localStorage.setItem("createdUser", JSON.stringify(createdUser));
    })
    useEffect(() => {
        window.localStorage.setItem("randomUser", JSON.stringify(randomUser));
    }, [randomUser])

// for animation
      useEffect(() => {
          const timer = setInterval(() => {
              setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 5));
          }, 400);
          return () => {
              clearInterval(timer);
          };
      }, []);

    const redirect = (path: string) => {
        history.push(path);
    }


/*    const getFilteredRandomUser = () => {
        return randomUser !== undefined ? {
            firstName: randomUser.results[0].name.first,
            lastName: randomUser.results[0].name.last,
            email: randomUser.results[0].email,
            street: randomUser.results[0].location.street.name,
            houseNr: randomUser.results[0].location.street.number,
            zipCode: randomUser.results[0].location.postcode,
            city: randomUser.results[0].location.city,
        } as PersonalData : initialValues

    }*/

    return (
        <>
            <Formik
                initialValues={step === StepTypes.CREATE ? initialValues : RANDOMUSER && randomUser !== undefined ? {
                        firstName: randomUser.results[0].name.first,
                        lastName: randomUser.results[0].name.last,
                        email: randomUser.results[0].email,
                        street: randomUser.results[0].location.street.name,
                        houseNr: randomUser.results[0].location.street.number,
                        zipCode: randomUser.results[0].location.postcode,
                        city: randomUser.results[0].location.city,
                    }
                    : createdUser}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    setIsLoading(true);
                    setProgress(0);
                    setCreatedUser({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        street: values.street,
                        houseNr: values.houseNr,
                        zipCode: values.zipCode,
                        city: values.city
                    });
                    fetch("https://randomuser.me/api/").then((response) => response.json())
                        .then((response) => {
                            setRandomUser(response);
                        })


                    setTimeout(() => {
                        setIsLoading(false);
                        resetTransientUser();
                        setSubmitting(false);
                        redirect("/profile/view");
                    }, 8000)


                }}
            >
                {(formikProps) => {
                    const {handleChange, handleSubmit, values, errors, isSubmitting, resetForm} = formikProps;

                    validationSchema().isValid(values).then((valid) => setIsValid(valid))

                    const renderButtonRow = (step: StepTypes) => {
                            switch (step) {
                                case StepTypes.CREATE:
                                    return (
                                        <Button onClick={() => {
                                        }} size={"big"} type={"submit"}
                                                classNames={"Button-big"}
                                                textClassNames={"Button-text"}
                                                disabled={isSubmitting || !isValid}
                                                contained={true}
                                        >User generieren
                                        </Button>
                                    )
                                case StepTypes.VIEW:
                                    return <div className={"ProfileForm-buttonWrapper"}>
                                        <Button onClick={() => {
                                            redirect("/profile/edit")
                                        }} size={"medium"} type={"button"}
                                                classNames={"Button-medium"}
                                                textClassNames={"Button-text"}
                                                disabled={false}
                                                contained={false}
                                        >Bearbeiten
                                        </Button>
                                        <Button onClick={() => {
                                            redirect("/profile/create")
                                        }} size={"medium"} type={"submit"}
                                                classNames={"Button-medium"}
                                                textClassNames={"Button-text"}
                                                disabled={!isValid}
                                                contained={true}
                                        >User anlegen
                                        </Button>
                                    </div>
                                case StepTypes.EDIT:
                                    return <div className={"ProfileForm-buttonWrapper"}>
                                        <Button onClick={() => {
                                            resetForm({values: {...createdUser}});
                                            resetTransientUser();

                                            redirect("/profile/view")
                                        }} size={"medium"} type={"button"}
                                                classNames={"Button-medium"}
                                                textClassNames={"Button-text"}
                                                disabled={false}
                                                contained={false}
                                        >Abbrechen
                                        </Button>
                                        <Button onClick={() => {
                                            redirect("/profile/view")
                                        }} size={"medium"} type={"submit"}
                                                classNames={"Button-medium"}
                                                textClassNames={"Button-text"}
                                                disabled={!isValid}
                                                contained={true}
                                        >Speichern
                                        </Button>
                                    </div>

                            }

                        }
                    ;


                    return (
                        <div className={"ProfileForm-wrapper"}>
                            <form className={"ProfileForm-form"} onSubmit={handleSubmit}>
                                <div className={"ProfileForm-picture"}>
                                    <Picture isLoading={isLoading}
                                             editMode={location.pathname.includes(StepTypes.CREATE)}
                                             progress={progress}
                                             step={step}
                                             image={(step !== StepTypes.CREATE && randomUser !== undefined) && randomUser.results[0].picture.large}
                                    />
                                </div>
                                {/*Group1*/}
                                <div className={"ProfileForm-group"}>
                                    <InputField id="firstName" name="firstName" value={values.firstName}
                                                onChange={handleChange("firstName")} type={"text"}
                                                placeholder={"Vorname"} className={"ProfileForm-name"}
                                                disabled={step === StepTypes.VIEW}
                                                onBlur={() => handleBlur(values)}
                                                withoutBackground={step === StepTypes.EDIT}
                                                valid={step === StepTypes.EDIT ? !Boolean(errors.firstName) : undefined}
                                    />
                                    <InputField id="lastName" name="lastName" value={values.lastName}
                                                onChange={handleChange("lastName")} type={"text"}
                                                placeholder={"Nachname"}
                                                className={"ProfileForm-lastname"}
                                                disabled={step === StepTypes.VIEW}
                                                onBlur={() => handleBlur(values)}
                                                withoutBackground={step === StepTypes.EDIT}
                                                valid={step === StepTypes.EDIT ? !Boolean(errors.lastName) : undefined}
                                    />
                                </div>

                                {/*Group2*/}
                                <div className={"ProfileForm-group"}>


                                    <InputField id="email" name="email" value={values.email}
                                                onChange={handleChange("email")} type={"email"}
                                                placeholder={"E-Mail-Adresse"}
                                                className={"ProfileForm-email"}
                                                disabled={step === StepTypes.VIEW}
                                                onBlur={() => handleBlur(values)}
                                                withoutBackground={step === StepTypes.EDIT}
                                                valid={step === StepTypes.EDIT ? !Boolean(errors.email) : undefined}
                                    />
                                </div>

                                {/*Group3*/}
                                <div className={"ProfileForm-group"}>
                                    <InputField id="street" name="street" value={values.street}
                                                onChange={handleChange("street")} type={"text"} placeholder={"Straße"}
                                                className={"ProfileForm-street"}
                                                disabled={step === StepTypes.VIEW}
                                                onBlur={() => handleBlur(values)}
                                                withoutBackground={step === StepTypes.EDIT}
                                                valid={step === StepTypes.EDIT ? !Boolean(errors.street) : undefined}
                                    />
                                    <InputField id="houseNr" name="houseNr" value={values.houseNr}
                                                onChange={handleChange("houseNr")} type={"text"} placeholder={"Hsnr."}
                                                className={"ProfileForm-houseNr"}
                                                disabled={step === StepTypes.VIEW}
                                                onBlur={() => handleBlur(values)}
                                                withoutBackground={step === StepTypes.EDIT}
                                                valid={step === StepTypes.EDIT ? !Boolean(errors.houseNr) : undefined}
                                    />
                                </div>

                                <div className={"ProfileForm-group2"}>
                                    <InputField id="zipCode" name="zipCode" value={values.zipCode}
                                                onChange={handleChange("zipCode")} type={"text"} placeholder={"PLZ"}
                                                className={"ProfileForm-zipCode"}
                                                disabled={step === StepTypes.VIEW}
                                                onBlur={() => handleBlur(values)}
                                                withoutBackground={step === StepTypes.EDIT}
                                                valid={step === StepTypes.EDIT ? !Boolean(errors.zipCode) : undefined}
                                    />
                                    <InputField id="city" name="city" value={values.city}
                                                onChange={handleChange("city")} type={"text"} placeholder={"Ort"}
                                                className={"ProfileForm-city"}
                                                disabled={step === StepTypes.VIEW}
                                                onBlur={() => handleBlur(values)}
                                                withoutBackground={step === StepTypes.EDIT}
                                                valid={step === StepTypes.EDIT ? !Boolean(errors.city) : undefined}
                                    />

                                </div>
                                {renderButtonRow(step)}
                            </form>
                        </div>
                    )
                }}


            </Formik>

        </>

    )
}


export const Profileform = withRouter(ProfileformComponent);
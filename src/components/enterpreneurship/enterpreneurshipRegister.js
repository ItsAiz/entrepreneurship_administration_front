import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from 'primereact/checkbox';
import { Toast } from "primereact/toast";
import { FileUpload} from "primereact/fileupload"
import EnterpreneurshipApi from "../../api/EnterpreneurshipApi";
import {
    physicalResourcesOptions,
    TechnologicResourcesOptions,
    categories,
    careers,
    businessPlan
} from "../../__mocks__/enterpreneurshipData";
import './enterpreneurStyles.css'

const EnterpreneurshipForm = ({
  initialEntrepreneurshipData,
  isEditing,
}) => {
    const [step, setStep] = useState(1);
    const [entrepreneurshipData, setEntrepreneurshipData] = useState(
        initialEntrepreneurshipData || {}
    );
    const toast = useRef(null);

    const showSticky = (notificationData) => {
        toast.current.show({
        severity: notificationData.severity,
        summary: notificationData.summary,
        detail: notificationData.detail,
        life: 2000,
        });
    };

    const onNextStep = () => {
        if (step === 1) {
            if (!isUserDataValid()) {
                return;
            }
        } else if (step === 2) {
            if (!isGeneralDataValid()) {
                return;
            }
        }
        setStep(step + 1);
    };

    const isUserDataValid = () => {
        if (!entrepreneurshipData.id_user
            ||!entrepreneurshipData.id_user.name
            ||!entrepreneurshipData.id_user.lastName
            ||!entrepreneurshipData.id_user.documentId
            ||!entrepreneurshipData.id_user.career
            ||!entrepreneurshipData.id_user.user
            ||!entrepreneurshipData.id_user.password) {
            showSticky({
                severity: "warn",
                summary: "Warning",
                detail: "Por favor, complete los datos del estudiante.",
            });
            return false;
        }
        if (!entrepreneurshipData.id_user.user || !isEmailValid(entrepreneurshipData.id_user.user)) {
            showSticky({
                severity: "warn",
                summary: "Warning",
                detail: "Por favor, ingrese un correo electrónico válido.",
            });
            return false;
        }
        return true;
    };

    const isGeneralDataValid = () => {
        if (!entrepreneurshipData.name
            ||!entrepreneurshipData.category
            ||!entrepreneurshipData.plan_status
            ||entrepreneurshipData.physical_point === undefined
            ||!entrepreneurshipData.physical_resources?.length
            ||!entrepreneurshipData.technological_resources?.length
            ) {
            showSticky({
                severity: "warn",
                summary: "Warning",
                detail: "Por favor, complete todos los campos generales del emprendimiento.",
            });
            return false;
        }
        return true;
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleUpdateEnterpreneurship = async () => {
        if(!isGeneralDataValid()){
            showSticky({
                severity: "warn",
                summary: "Warning",
                detail: 'Los campos deben estar completos',
            });
        }
        await EnterpreneurshipApi.updateEnterpreneurship(entrepreneurshipData)
        .then((resp) =>{
            showSticky({
                severity: "success",
                summary: "Success",
                detail: resp,
            });
        })
        .catch((error)=>{
            showSticky({
                severity: "error",
                summary: "Error",
                detail: "Hubo un error en la solicitud: " + error.message,
            });
        });
    };

    const handleCreateEnterpreneurship = async () =>{
        if(!isGeneralDataValid()){
            showSticky({
                severity: "warn",
                summary: "Warning",
                detail: 'Los campos deben estar completos',
            });
        }
        console.log(entrepreneurshipData)
        await EnterpreneurshipApi.createEnterpreneurship(entrepreneurshipData)
        .then((resp) =>{
            showSticky({
                severity: "success",
                summary: "Success",
                detail: resp,
            });
        })
        .catch((error) => {
            showSticky({
                severity: "error",
                summary: "Error",
                detail: "Hubo un error en la solicitud: " + error.message,
            });
        });
    }

    const onXlsFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const selectedFileForm = new FormData();
        selectedFileForm.append('file', selectedFile);
        setEntrepreneurshipData({
          ...entrepreneurshipData,
          business_plan_name: selectedFileForm,
        });
      };

    return (
        <div
        className={`card flex justify-content-center`}
          style={{
            marginTop: "5%",
            marginLeft: isEditing ? '0' : '20%',
            marginRight: "20%",
            width: isEditing ? '100%' : '',
          }}
        >
        <Toast ref={toast} />
        {step === 1 && (
            <div className="col s12">
            <Card title="Datos del estudiante">
                <div className="row">
                    <div className="col s6">
                        <label>Nombres</label>
                        <InputText
                        value={entrepreneurshipData.id_user ? entrepreneurshipData.id_user.name : ''}
                        onChange={(e) =>
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            id_user: {
                                ...entrepreneurshipData.id_user,
                                name: e.target.value
                            },
                            })
                        }
                        />
                    </div>
                    <div className="col s6">
                        <label>Apellidos</label>
                        <InputText
                        value={entrepreneurshipData.id_user ? entrepreneurshipData.id_user.lastName : ''}
                        onChange={(e) =>
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            id_user: {
                                ...entrepreneurshipData.id_user,
                                lastName: e.target.value
                            },
                            })
                        }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <label>N° documento</label>
                        <InputText
                        value={entrepreneurshipData.id_user ? entrepreneurshipData.id_user.documentId : ''}
                        onChange={(e) =>
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            id_user: {
                                ...entrepreneurshipData.id_user,
                                documentId: e.target.value
                            },
                            })
                        }
                        keyfilter={/^[0-9]+$/} 
                        />
                    </div>
                    <div className="col s6">
                        <label>Carrera</label>
                        <br></br>
                        <Dropdown
                            options={careers.map((career) => ({ label: career, value: career }))}
                            value={entrepreneurshipData.id_user ? entrepreneurshipData.id_user.career : ''}
                            disabled={isEditing ? true : false}
                            onChange={(e) =>
                                setEntrepreneurshipData({
                                    ...entrepreneurshipData,
                                    id_user: {
                                        ...entrepreneurshipData.id_user,
                                        career: e.target.value
                                    },
                                })
                            }
                            style={{ width: '100%' }}
                            placeholder="Seleccione una carrera"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <label>Usuario</label>
                        <InputText
                        value={entrepreneurshipData.id_user ? entrepreneurshipData.id_user.user : ''}
                        type={'email'}
                        disabled={isEditing ? true : false}
                        onChange={(e) =>
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            id_user: {
                                ...entrepreneurshipData.id_user,
                                user: e.target.value
                            },
                            })
                        }
                        />
                    </div>
                    <div className="col s6">
                        <label>Contraseña</label>
                        <InputText
                        value={entrepreneurshipData.id_user ? entrepreneurshipData.id_user.password : ''}
                        disabled={isEditing ? true : false}
                        onChange={(e) =>
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            id_user: {
                                ...entrepreneurshipData.id_user,
                                password: e.target.value
                            },
                            })
                        }
                        type="password"
                        />
                    </div>
                </div>
                <div
                className="p-card-footer"
                style={{ textAlign: "right", width: "100%" }}
                >
                <Button
                    label="Siguiente"
                    icon="pi pi-chevron-right"
                    onClick={onNextStep}
                />
                </div>
            </Card>
            </div>
        )}
        {step === 2 && (
            <div className="col s12">
            <Card title="Datos generales del Emprendimiento">
                <div className="row">
                    <div className="col s6">
                        <label>Nombre del Emprendimiento</label>
                        <InputText
                        value={entrepreneurshipData.name || ''}
                        disabled={isEditing ? true : false}
                        onChange={(e) =>
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            name: e.target.value,
                            })
                        }
                        />
                    </div>
                    <div className="col s6">
                        <label>Categoría</label>
                        <br></br>
                        <Dropdown
                            options={categories.map((category) => ({ label: category, value: category }))}
                            value={entrepreneurshipData.category || ''}
                            onChange={(e) =>
                                setEntrepreneurshipData({
                                    ...entrepreneurshipData,
                                    category: e.value,
                                })
                            }
                            style={{ width: '100%' }}
                            placeholder="Seleccione una categoría"
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className="col s6">
                        <label>Estado del plan de Negocio</label>
                        <br></br>
                        <Dropdown
                            options={businessPlan.map((planState) => ({ label: planState, value: planState }))}
                            value={entrepreneurshipData.plan_status || ''}
                            onChange={(e) =>
                                setEntrepreneurshipData({
                                    ...entrepreneurshipData,
                                    plan_status: e.value,
                                })
                            }
                            style={{ width: '100%' }}
                            placeholder="Seleccione un estado"
                        />
                    </div>
                    <div className="col s6">
                        <label>Punto Físico</label>
                        <br></br>
                        <Dropdown
                            options={['Si', 'No']}
                            value={entrepreneurshipData.physical_point === undefined
                                ? ''
                                : (entrepreneurshipData.physical_point ? 'Si' : 'No')}
                            onChange={(e) =>
                                setEntrepreneurshipData({
                                    ...entrepreneurshipData,
                                    physical_point: e.value === 'Si',
                                })
                            }
                            style={{ width: '100%' }}
                            placeholder="Si/No"
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className="col s6">
                        <label>Recursos Físicos</label>
                        <div>
                            {physicalResourcesOptions.map((option, index) => (
                            <div key={index} className="p-field-checkbox">
                                <Checkbox
                                inputId={`physical_resources${index}`}
                                value={option}
                                onChange={(e) => {
                                    const updatedphysical_resources = e.checked
                                    ? [...(entrepreneurshipData.physical_resources || []), option]
                                    : (entrepreneurshipData.physical_resources || []).filter(
                                        (item) => item !== option
                                        );
                                    setEntrepreneurshipData({
                                    ...entrepreneurshipData,
                                    physical_resources: updatedphysical_resources,
                                    });
                                }}
                                checked={
                                    entrepreneurshipData.physical_resources
                                    ? entrepreneurshipData.physical_resources.includes(option)
                                    : false
                                }
                                />
                                <label htmlFor={`physical_resources${index}`}>{option}</label>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="col s6">
                        <label>Recursos Tecnológicos</label>
                        <div>
                            {TechnologicResourcesOptions.map((option, index) => (
                            <div key={index} className="p-field-checkbox">
                                <Checkbox
                                inputId={`technological_resources${index}`}
                                value={option}
                                onChange={(e) => {
                                    const updatedtechnological_resources = e.checked
                                    ? [
                                        ...(entrepreneurshipData.technological_resources || []),
                                        option,
                                        ]
                                    : (entrepreneurshipData.technological_resources || []).filter(
                                        (item) => item !== option
                                        );
                                    setEntrepreneurshipData({
                                    ...entrepreneurshipData,
                                    technological_resources: updatedtechnological_resources,
                                    });
                                }}
                                checked={
                                    entrepreneurshipData.technological_resources
                                    ? entrepreneurshipData.technological_resources.includes(option)
                                    : false
                                }
                                />
                                <label htmlFor={`technological_resources${index}`}>{option}</label>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                className="p-card-footer"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
                >
                <Button
                    label="Anterior"
                    icon="pi pi-chevron-left"
                    onClick={() => setStep(step - 1)}
                />
                <Button
                    label="Siguiente"
                    icon="pi pi-chevron-right"
                    onClick={onNextStep}
                />
                </div>
            </Card>
            </div>
        )}
        {step === 3 && (
            <div className="col s12">
            <Card title="Plan de Negocio">
                <div className="row">
                    <div className="col s12">
                        <FileUpload
                        mode="basic"
                        chooseLabel="Seleccionar archivo"
                        uploadLabel="Subir"
                        accept=".xlsx"
                        maxFileSize={1000000}
                        customUpload={true}
                        onUpload={onXlsFileChange}
                        display={'block'}
                        />
                    </div>
                </div>
                <div
                className="p-card-footer"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
                >
                <Button
                    label="Anterior"
                    icon="pi pi-chevron-left"
                    onClick={() => setStep(step - 1)}
                />
                {isEditing ? (
                    <>
                    <Button
                        label="Guardar Cambios"
                        icon="pi pi-check"
                        onClick={handleUpdateEnterpreneurship}
                    />
                    </>
                ) : (
                    <Button
                    label="Crear Emprendimiento"
                    icon="pi pi-check"
                    onClick={handleCreateEnterpreneurship}
                    />
                )}
                </div>
            </Card>
            </div>
        )}
        </div>
    );
};

export default EnterpreneurshipForm;

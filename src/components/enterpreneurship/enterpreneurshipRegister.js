import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from 'primereact/checkbox';
import { Toast } from "primereact/toast";
import EnterpreneurshipApi from "../../api/EnterpreneurshipApi";

const EnterpreneurshipForm = ({
  initialEntrepreneurshipData,
  isEditing,
}) => {
    const recursosFisicosOptions = [
        "Mobiliario",
        "Maquinaria",
        "Infraestructura tecnológica",
        "Lugar de almacenamiento",
        "Suministros de oficina",
        "Otros",
        "Ninguno",
      ];
      
      const recursosTecnologicosOptions = [
        "Dispositivos electrónicos",
        "Software de gestión",
        "Presencia digital",
        "Comercio electrónico",
        "Automatización de procesos",
        "Otros",
        "Ninguno",
    ];
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
        setStep(step + 1);
    };

    const handleUpdateEnterpreneurship = async () =>{
        try {
            const resp = await EnterpreneurshipApi.updateEnterpreneurship(entrepreneurshipData);
            showSticky({
                severity: "success",
                summary: "Success",
                detail: resp,
            });
        } catch (error) {
            showSticky({
                severity: "error",
                summary: "Error",
                detail: "Hubo un error en la solicitud: " + error.message,
            });
        }
    }

    const handleCreateEnterpreneurship = async () =>{
        try {
            const resp = await EnterpreneurshipApi.createEnterpreneurship(entrepreneurshipData);
            showSticky({
                severity: "success",
                summary: "Success",
                detail: resp,
            });
        } catch (error) {
            showSticky({
                severity: "error",
                summary: "Error",
                detail: "Hubo un error en la solicitud: " + error.message,
            });
        }
    }

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
                    value={entrepreneurshipData.nombres}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        nombres: e.target.value,
                        })
                    }
                    />
                </div>
                <div className="col s6">
                    <label>Apellidos</label>
                    <InputText
                    value={entrepreneurshipData.apellidos}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        apellidos: e.target.value,
                        })
                    }
                    />
                </div>
                </div>
                <div className="row">
                <div className="col s6">
                    <label>N° documento</label>
                    <InputText
                    value={entrepreneurshipData.numeroDocumento}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        numeroDocumento: e.target.value,
                        })
                    }
                    />
                </div>
                <div className="col s6">
                    <label>Carrera</label>
                    <br></br>
                    <Dropdown
                    options={[]}
                    value={entrepreneurshipData.carrera}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        carrera: e.value,
                        })
                    }
                    style={{width: '100%'}}
                    placeholder="Seleccione una carrera"
                    />
                </div>
                </div>
                <div className="row">
                <div className="col s6">
                    <label>Correo Electrónico</label>
                    <InputText
                    value={entrepreneurshipData.correoElectronico}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        correoElectronico: e.target.value,
                        })
                    }
                    type="email"
                    />
                </div>
                <div className="col s6">
                    <label>Celular</label>
                    <InputText
                    value={entrepreneurshipData.celular}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        celular: e.target.value,
                        })
                    }
                    />
                </div>
                </div>
                <div className="row">
                <div className="col s6">
                    <label>Usuario</label>
                    <InputText
                    value={entrepreneurshipData.usuario}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        usuario: e.target.value,
                        })
                    }
                    />
                </div>
                <div className="col s6">
                    <label>Contraseña</label>
                    <InputText
                    value={entrepreneurshipData.contraseña}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        contraseña: e.target.value,
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
                    value={entrepreneurshipData.nombreEmprendimiento}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        nombreEmprendimiento: e.target.value,
                        })
                    }
                    />
                </div>
                <div className="col s6">
                    <label>Categoría</label>
                    <br></br>
                    <Dropdown
                    options={[]}
                    value={entrepreneurshipData.categoria}
                    onChange={(e) =>
                        setEntrepreneurshipData({
                        ...entrepreneurshipData,
                        categoria: e.value,
                        })
                    }
                    style={{width: '100%'}}
                    placeholder="Seleccione una categoría"
                    />
                </div>
                </div>
                <div className={'row'}>
                    <div className="col s6">
                        <label>Estado del plan de Negocio</label>
                        <br></br>
                        <Dropdown
                        options={[]}
                        value={entrepreneurshipData.estadoPlan}
                        onChange={(e) =>
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            estadoPlan: e.value,
                            })
                        }
                        style={{width: '100%'}}
                        placeholder="Seleccione un estado"
                        />
                    </div>
                    <div className="col s6">
                        <label>Punto Físico</label>
                        <br></br>
                        <Dropdown
                        options={['Si', 'No']}
                        value={entrepreneurshipData.puntoFisico}
                        onChange={(e) =>
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            puntoFisico: e.value,
                            })
                        }
                        style={{width: '100%'}}
                        placeholder="Si/No"
                        />
                    </div>
                </div>
                <div className={'row'}>
                <div className="col s6">
                <label>Recursos Físicos</label>
                <div>
                    {recursosFisicosOptions.map((option, index) => (
                    <div key={index} className="p-field-checkbox">
                        <Checkbox
                        inputId={`recursosFisicos${index}`}
                        value={option}
                        onChange={(e) => {
                            const updatedRecursosFisicos = e.checked
                            ? [...(entrepreneurshipData.recursosFisicos || []), option]
                            : (entrepreneurshipData.recursosFisicos || []).filter(
                                (item) => item !== option
                                );
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            recursosFisicos: updatedRecursosFisicos,
                            });
                        }}
                        checked={
                            entrepreneurshipData.recursosFisicos
                            ? entrepreneurshipData.recursosFisicos.includes(option)
                            : false
                        }
                        />
                        <label htmlFor={`recursosFisicos${index}`}>{option}</label>
                    </div>
                    ))}
                </div>
              </div>
              <div className="col s6">
                <label>Recursos Tecnológicos</label>
                <div>
                    {recursosTecnologicosOptions.map((option, index) => (
                    <div key={index} className="p-field-checkbox">
                        <Checkbox
                        inputId={`recursosTecnologicos${index}`}
                        value={option}
                        onChange={(e) => {
                            const updatedRecursosTecnologicos = e.checked
                            ? [
                                ...(entrepreneurshipData.recursosTecnologicos || []),
                                option,
                                ]
                            : (entrepreneurshipData.recursosTecnologicos || []).filter(
                                (item) => item !== option
                                );
                            setEntrepreneurshipData({
                            ...entrepreneurshipData,
                            recursosTecnologicos: updatedRecursosTecnologicos,
                            });
                        }}
                        checked={
                            entrepreneurshipData.recursosTecnologicos
                            ? entrepreneurshipData.recursosTecnologicos.includes(option)
                            : false
                        }
                        />
                        <label htmlFor={`recursosTecnologicos${index}`}>{option}</label>
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
                {isEditing ? (
                    <>
                    <Button
                        label="Guardar Cambios"
                        icon="pi pi-check"
                        onClick={() => handleUpdateEnterpreneurship(entrepreneurshipData)}
                    />
                    </>
                ) : (
                    <Button
                    label="Crear Emprendimiento"
                    icon="pi pi-check"
                    onClick={() => handleCreateEnterpreneurship(entrepreneurshipData)}
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

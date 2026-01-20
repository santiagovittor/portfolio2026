"use client";

import { useMemo, useState } from "react";
import { useTheme } from "./ThemeProvider";
import SocialMedia from "./SocialMedia";

type Values = {
  nombre: string;
  correo: string;
  celular: string;
  mensaje: string;
};

export default function ContactSection() {
  const { isDark } = useTheme();

  const [values, setValues] = useState<Values>({
    nombre: "",
    correo: "",
    celular: "",
    mensaje: "",
  });

  const [touched, setTouched] = useState<Record<keyof Values, boolean>>({
    nombre: false,
    correo: false,
    celular: false,
    mensaje: false,
  });

  const [sent, setSent] = useState(false);
  const [messageId, setMessageId] = useState<string>("");

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Values, string>> = {};

    if (!values.nombre) e.nombre = "Please enter your name.";
    else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nombre))
      e.nombre = "Name can only contain letters and spaces.";

    if (!values.correo) e.correo = "Please enter your email.";
    else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo))
      e.correo = "Please enter a valid email address.";

    if (!values.celular) e.celular = "Please enter a phone number.";
    else if (!/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(values.celular))
      e.celular = "Please enter a valid phone number (10 digits).";

    if (!values.mensaje) e.mensaje = "Please write a message.";

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const eachClass = isDark ? "inputContainer__each--isDark" : "inputContainer__each";

  const onChange =
    (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
    };

  const onBlur = (key: keyof Values) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      nombre: true,
      correo: true,
      celular: true,
      mensaje: true,
    });

    if (!isValid) return;

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());

    setMessageId(id);
    setSent(true);

    setValues({ nombre: "", correo: "", celular: "", mensaje: "" });

    window.setTimeout(() => setSent(false), 15000);
  };

  // NOTE: button classes are intentionally inverted to match the CRA styling:
  const activeButtonClass = isDark ? "inputContainer__button" : "inputContainer__buttonIsDark";
  const disabledButtonClass = isDark
    ? "inputContainer__buttonIsDark--disabled"
    : "inputContainer__button--disabled";

  return (
    <div className={isDark ? "contactContainer__isDark" : "contactContainer"}>
      <div className="contactContainer__form" data-aos="fade-down">
        <h1>CONTACT</h1>
        <SocialMedia />

        <h4>
          Want to collaborate or talk about an opportunity? Send me a message using the
          form below.
        </h4>

        <div className="inputContainer">
          <form onSubmit={onSubmit}>
            <div className={eachClass}>
              <label htmlFor="nombre">Name</label>
              <input
                id="nombre"
                value={values.nombre}
                onChange={onChange("nombre")}
                onBlur={onBlur("nombre")}
                type="text"
              />
            </div>
            {touched.nombre && errors.nombre ? (
              <div className="inputContainer__each--error">{errors.nombre}</div>
            ) : null}

            <div className={eachClass}>
              <label htmlFor="correo">Email</label>
              <input
                id="correo"
                value={values.correo}
                onChange={onChange("correo")}
                onBlur={onBlur("correo")}
                type="email"
              />
            </div>
            {touched.correo && errors.correo ? (
              <div className="inputContainer__each--error">{errors.correo}</div>
            ) : null}

            <div className={eachClass}>
              <label htmlFor="celular">Phone</label>
              <input
                id="celular"
                value={values.celular}
                onChange={onChange("celular")}
                onBlur={onBlur("celular")}
                type="text"
              />
            </div>
            {touched.celular && errors.celular ? (
              <div className="inputContainer__each--error">{errors.celular}</div>
            ) : null}

            <div className={eachClass}>
              <label htmlFor="mensaje">Message</label>
              <input
                id="mensaje"
                value={values.mensaje}
                onChange={onChange("mensaje")}
                onBlur={onBlur("mensaje")}
                type="text"
                maxLength={100}
              />
            </div>
            {touched.mensaje && errors.mensaje ? (
              <div className="inputContainer__each--error">{errors.mensaje}</div>
            ) : null}

            <button className={isValid ? activeButtonClass : disabledButtonClass} type="submit">
              Send message
            </button>

            {sent ? (
              <div className="inputContainer__successAlert">
                Message sent! Reference: {messageId}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

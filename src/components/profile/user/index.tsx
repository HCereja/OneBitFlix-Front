import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import profileService from "../../../services/profileServices";
import ToastComponent from "../../common/toast";
import { useRouter } from "next/router";

const UserForm = () => {
  const router = useRouter();

  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [created_at, setCreated_at] = useState("");

  const date = new Date(created_at);
  const month = date.toLocaleString("default", { month: "long" });

  useEffect(() => {
    profileService.fetchCurrentInfo().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setInitialEmail(user.email);
      setCreated_at(user.createdAt);
    });
  }, []);

  const handleUserUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await profileService.updateUserInfo({
      firstName,
      lastName,
      phone,
      email,
      created_at,
    });

    if (res === 200) {
      setColor("bg-success");
      setErrorMessage("Informações de usuário atualizadas com sucesso!");
      setToastIsOpen(true);
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      if (email !== initialEmail) {
        sessionStorage.clear();
        router.push("/");
      }
    } else {
      setColor("bg-danger");
      setErrorMessage("E-mail ja está sendo usado");
      setToastIsOpen(true);
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form onSubmit={handleUserUpdate} className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>{`${firstName.slice(
            0,
            1
          )}${lastName.slice(0, 1)}`}</p>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          {/* NOME */}
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Nome"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </FormGroup>
          {/* SOBRENOME */}
          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Sobrenome"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </FormGroup>
        </div>
        <div className={styles.inputDiv}>
          {/* WHATSAPP / TELEGRAM */}
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) 9xxxx-xxxx"
              required
              className={styles.input}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </FormGroup>
          {/* E-MAIL */}
          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="E-mail"
              required
              className={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>
          <Button className={styles.formBtn} outline type="submit">
            SALVAR INFORMAÇÕES
          </Button>
        </div>
      </Form>
      <ToastComponent
        isOpen={toastIsOpen}
        color={color}
        message={errorMessage}
      />
    </>
  );
};

export default UserForm;

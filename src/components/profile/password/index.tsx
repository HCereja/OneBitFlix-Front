import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import profileService from "../../../services/profileServices";
import ToastComponent from "../../common/toast";

const PasswordForm = () => {
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setColor("bg-danger");
      setErrorMessage("Nova senha e senha de confirmação devem ser iguais!");
      setToastIsOpen(true);
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      return;
    }
    if (currentPassword === newPassword) {
      setColor("bg-danger");
      setErrorMessage("Nova senha deve ser diferente!");
      setToastIsOpen(true);
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      return;
    }

    const res = await profileService.passwordUpdate({
      currentPassword,
      newPassword,
    });

    if (res === 204) {
      setColor("bg-success");
      setErrorMessage("Senha alterada com sucesso!");
      setToastIsOpen(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    } else if (res === 400) {
      setColor("bg-danger");
      setErrorMessage("Senha atual incorreta!");
      setToastIsOpen(true);
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    } else {
      setColor("bg-danger");
      setErrorMessage("Não foi possível alterar a senha!");
      setToastIsOpen(true);
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUpdatePassword}>
        <div className={styles.inputDiv}>
          <FormGroup>
            <Label for="currentPassword" className={styles.label}>
              SENHA ATUAL
            </Label>
            <Input
              name="currentPassword"
              id="currentPassword"
              type="password"
              placeholder="********"
              required
              minLength={6}
              maxLength={20}
              className={styles.input}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label for="newPassword" className={styles.label}>
              NOVA SENHA
            </Label>
            <Input
              name="newPassword"
              id="newPassword"
              type="password"
              placeholder="********"
              required
              minLength={6}
              maxLength={20}
              className={styles.inputFlex}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword" className={styles.label}>
              CONFIRMAR SENHA
            </Label>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="********"
              required
              minLength={6}
              maxLength={20}
              className={styles.inputFlex}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </FormGroup>
        </div>
        <div className={styles.btnDiv}>
          <Button className={styles.formBtn} outline type="submit">
            SALVAR NOVA SENHA
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

export default PasswordForm;

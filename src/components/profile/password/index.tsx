import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";

const PasswordForm = () => {
  return (
    <>
      <Form className={styles.form}>
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
            />
          </FormGroup>
        </div>
        <div className={styles.btnDiv}>
          <Button className={styles.formBtn} outline type="submit">
            SALVAR ALTERAÇÕES
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PasswordForm;

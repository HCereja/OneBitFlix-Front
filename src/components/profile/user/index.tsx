import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";

const UserForm = () => {
  return (
    <>
      <Form className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>UT</p>
          <p className={styles.userName}>USER TESTE</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br /> 20 de abril de 2023
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
              value={"User"}
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
              value={"Teste"}
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
              value={"+55 (12) 91111-1111"}
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
              value={"userteste@email.com"}
            />
          </FormGroup>
          <Button className={styles.formBtn} outline type="submit">
            SALVAR INFORMAÇÕES
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UserForm;

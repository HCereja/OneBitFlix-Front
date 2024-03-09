import Head from "next/head";
import styles from "../styles/profile.module.scss";
import UserForm from "../src/components/profile/user";
import HeaderAuth from "../src/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "../src/components/common/footer";
import { useEffect, useState } from "react";
import PasswordForm from "../src/components/profile/password";
import { useRouter } from "next/router";
import SpinnerComponent from "../src/components/common/spinner";

const Profile = () => {
  const router = useRouter();

  const [form, setForm] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Head>
        <title>OneBitFlix - Perfil</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className={styles.gridContainer}>
          <p className={styles.title}>Minha conta</p>
          <Row>
            <Col md={4} className={styles.btnColumn}>
              <Button
                className={styles.renderForm}
                style={{ color: form === "user" ? "#FF0044" : "white" }}
                onClick={() => {
                  setForm("user");
                }}
              >
                DADOS PESSOAIS
              </Button>
              <Button
                className={styles.renderForm}
                style={{ color: form === "password" ? "#FF0044" : "white" }}
                onClick={() => {
                  setForm("password");
                }}
              >
                SENHA
              </Button>
            </Col>
            <Col md>{form === "user" ? <UserForm /> : <PasswordForm />}</Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Profile;

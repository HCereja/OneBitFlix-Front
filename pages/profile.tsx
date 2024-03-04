import Head from "next/head";
import styles from "../styles/profile.module.scss";
import UserForm from "../src/components/profile/user";
import HeaderAuth from "../src/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "../src/components/common/footer";

const Profile = () => {
  return (
    <>
      <Head>
        <title>OneBitFlix - Perfil</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className="py-5">
          <p className={styles.title}>Minha conta</p>
          <Row>
            <Col md={4} className={styles.btnColumn}>
              <Button className={styles.renderForm}>DADOS PESSOAIS</Button>
              <Button className={styles.renderForm}>SENHA</Button>
            </Col>
            <Col md>
              <UserForm />
            </Col>
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
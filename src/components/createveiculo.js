import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Row, Col, Button } from "react-bootstrap";

class CreateVeiculo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modelo: "",
      fabricante: "",
      ano: "",
      preco: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSave = () => {
    const { modelo, fabricante, ano, preco } = this.state;

    axios
      .post("http://localhost:8989/api/veiculo", {
        modelo,
        fabricante,
        ano,
        preco,
      })
      .then((response) => {
        Swal.fire({
          title: "Veículo cadastrado com sucesso!",
          icon: "success",
        });
        this.handleGetDataSet();

        this.setState({
          modelo: "",
          fabricante: "",
          ano: "",
          preco: "",
        });

      })
      .catch((error) => {
        Swal.fire({
          title: "Erro ao cadastrar veículo!",
          text: error.message,
          icon: "error",
        });
      });
  };

  handleGetDataSet() {
    this.props.getdataSet();
  }

  render() {
    const { modelo, fabricante, ano, preco } = this.state;

    return (
      <Form>
        <Row>
          <Col xs={12} md={2}>
            <Form.Group controlId="modelo" col={2}>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={modelo}
                onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Insira o modelo do veículo
              </Form.Text>
            </Form.Group>
          </Col>

          <Col xs={12} md={2}>
            <Form.Group controlId="fabricante" col={2}>
              <Form.Label>Fabricante</Form.Label>
              <Form.Control
                type="text"
                name="fabricante"
                value={fabricante}
                onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Insira o fabricante do veículo
              </Form.Text>
            </Form.Group>
          </Col>
          <Col xs={12} md={2}>
            <Form.Group controlId="ano" col={2}>
              <Form.Label>Ano</Form.Label>
              <Form.Control
                type="text"
                name="ano"
                value={ano}
                onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Insira o ano do veículo
              </Form.Text>
            </Form.Group>
          </Col>
          <Col xs={12} md={2}>
            <Form.Group controlId="preco" col={2}>
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                name="preco"
                value={preco}
                onChange={this.handleInputChange}
              />
              <Form.Text className="text-muted">
                Insira o preço do veículo
              </Form.Text>
            </Form.Group>
          </Col>
          <Col xs={12} md={2}>
            <Button className="mt-4" variant="primary" onClick={this.handleSave}>
              Salvar
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CreateVeiculo;

import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Modal } from 'react-bootstrap';

class EditVeiculo extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            showModal: false,
            closeModal: false,
            modelo: '',
            fabricante: '',
            ano: '',
            preco: ''
        };
    }

    handleHideModal = () => {
        this.setState({ showModal: false });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {
        this.setState({ showModal: this.props.showModal });
        const { modelo, fabricante, ano, preco } = this.props.veiculo;

        this.setState({
            modelo,
            fabricante,
            ano,
            preco
        });
    }

    handleClose = () => {
        this.props.handleCloseModal();
        this.handleGetDataSet();
    };

    handleGetDataSet() {
        this.props.getdataSet();
      }

    handleSave = () => {
        const { modelo, fabricante, ano, preco } = this.state;
        const id = this.props.veiculo.id;

        axios
            .put("http://localhost:8989/api/veiculo/"+id, {
                modelo,
                fabricante,
                ano,
                preco,
            })
            .then((response) => {
                Swal.fire({
                    title: "Veículo atualizado com sucesso!",
                    icon: "success",
                });

                this.handleGetDataSet();
                
            })
            .catch((error) => {
                Swal.fire({
                    title: "Erro ao cadastrar veículo!",
                    text: error.message,
                    icon: "error",
                });
            });
    };

    render() {
        const { modelo, fabricante, ano, preco } = this.state;

        return (
            <Modal size="xl" show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar Veículo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col xs={12} md={3}>
                                <Form.Group controlId="modelo" col={3}>
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

                            <Col xs={12} md={3}>
                                <Form.Group controlId="fabricante" col={3}>
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
                            <Col xs={12} md={3}>
                                <Form.Group controlId="ano" col={3}>
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
                            <Col xs={12} md={3}>
                                <Form.Group controlId="preco" col={3}>
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
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditVeiculo;

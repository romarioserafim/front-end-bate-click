import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Row, Col, Button, Table, Card, Modal } from "react-bootstrap";
import moment from 'moment';


class Defeitos extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            showModal: false,
            closeModal: false,
            modelo: '',
            fabricante: '',
            ano: '',
            preco: '',
            defeito: [],
            descricao_defeito: '',
            id_defeito: '',
            update: false,
            defeitoSelecionado: null,
            indexDefect: null,
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
        const { defeito } = this.props.veiculo;

        this.setState({
            defeito,
        });
    }

    handleCloseModal = () => {
        this.setState({ defeitoSelecionado: null });
    };


    handleClose = () => {
        this.props.handleCloseModal();
        this.handleGetDataSet();
    };

    handleGetDataSet() {
        this.props.getdataSet();
    }

    handleEditDefect(defect, index) {
        this.setState({
            id_defeito: defect.id,
            descricao_defeito: defect.descricao_defeito,
            update: true,
            index: index,
        });
    }

    handleEmpty() {
        this.setState({
            id_defeito: null,
            descricao_defeito: '',
            update: false,
            index: '',
        });
    }

    handleSave = () => {
        const descricao_defeito = this.state.descricao_defeito;
        const idVeiculo = this.props.veiculo.id;

        axios
            .post("http://localhost:8989/api/defeito/", {
                descricao_defeito,
                idVeiculo
            })
            .then((response) => {
                console.log(response);
                Swal.fire({
                    title: "Defeito cadastrado com sucesso!",
                    icon: "success",
                });
                let defects = this.state.defeito;

                defects.push(response.data.data);
                console.log(defects);
                defects = defects.filter((obj, index, self) =>
                    index === self.findIndex((o) => o.id === obj.id)
                );
                this.setState({
                    defeito: defects
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Erro ao cadastrar Defeito!",
                    text: error.message,
                    icon: "error",
                });
            });
    };


    handleUpdate = () => {
        const descricao_defeito = this.state.descricao_defeito;
        const idVeiculo = this.props.veiculo.id;
        const id = this.state.id_defeito;

        axios
            .put("http://localhost:8989/api/defeito/" + id, {
                descricao_defeito,
                idVeiculo,
            })
            .then((response) => {
                console.log(response);
                Swal.fire({
                    title: "Defeito cadastrado com sucesso!",
                    icon: "success",
                });
                const newDefect = [...this.state.defeito];
                newDefect.splice(this.state.index, 1);
                newDefect.push(response.data.data);

                this.setState({ defeito: newDefect });

                this.handleEmpty();
            })
            .catch((error) => {
                Swal.fire({
                    title: "Erro ao cadastrar Defeito!",
                    text: error.message,
                    icon: "error",
                });
            });
    };
    deleteDefect = (id, index) => {
        axios
            .delete("http://localhost:8989/api/defeito/" + id)
            .then((response) => {
                Swal.fire({
                    title: "Defeito Deletado com sucesso!",
                    icon: "success",
                });
                const newDefeito = [...this.state.defeito];
                newDefeito.splice(index, 1);
                this.setState({ defeito: newDefeito });

            })
            .catch((error) => {
                Swal.fire({
                    title: "Erro ao deletar defeito!",
                    text: error.message,
                    icon: "error",
                });
            });
    };

    render() {
        const { descricao_defeito } = this.state;

        return (
            <Modal size="xl" show={this.props.showModalDefect} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Defeitos do Veículo {this.props.veiculo.modelo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group controlId="descricao_defeito" col={6}>
                                    <Form.Label>Defeito</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="descricao_defeito"
                                        value={descricao_defeito}
                                        onChange={this.handleInputChange}
                                    />
                                    {!this.state.update && <Form.Text className="text-muted">
                                        Insira novo defeito do veículo
                                    </Form.Text>}
                                    {this.state.update && <Form.Text className="text-muted">
                                        Altere o Defeito e clique em Atualizar
                                    </Form.Text>}
                                </Form.Group>
                            </Col>

                            {!this.state.update && <Col xs={12} md={1}> <Button variant="primary" onClick={() => this.handleSave()} style={{ marginTop: '31px' }}>
                                Salvar
                            </Button>
                            </Col>
                            }

                            {this.state.update && <Col xs={12} md={1}> <Button variant="primary" onClick={() => this.handleUpdate()} style={{ marginTop: '31px' }}>
                                Atualizar
                            </Button>
                            </Col>
                            }

                            {this.state.update && <Col xs={12} md={1}> <Button variant="primary" onClick={() => this.handleEmpty()} style={{ marginTop: '31px' }}>
                                Novo
                            </Button>
                            </Col>
                            }


                        </Row>
                    </Form>

                    <Card>
                        <Card.Header><h6 >Lista de Defeitos</h6></Card.Header>
                        <Card.Body>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Defeito</th>
                                        <th>Data Cadastro</th>

                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.defeito.map((defeito, index) =>
                                            <tr key={index} >
                                                <td >{defeito.descricao_defeito}
                                                </td>
                                                <td>{moment(defeito.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>
                                                    <Button variant="danger" onClick={() => this.deleteDefect(defeito.id, index)}>Excluir</Button>/
                                                    <Button variant="primary" onClick={() => this.handleEditDefect(defeito, index)}>Atualizar</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
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

export default Defeitos;

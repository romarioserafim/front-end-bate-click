import Table from 'react-bootstrap/Table';
import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import EditVeiculo from './Editveiculo';

import Createveiculo from './createveiculo';
import Card from 'react-bootstrap/Card';
import Defeitos from './defeitos';


class Home extends React.Component {

    constructor(propos) {
        super(propos);

        this.state = {
            veiculos: [],
            veiculoSelecionado: null,
            showModal: false,
            showModalDefect: false,
            defectSelected: null
        }


    }

    handleEdit = veiculo => {
        this.setState({ veiculoSelecionado: veiculo, showModal: true });
    };

    handleDefect = veiculo => {
        this.setState({ defectSelected: veiculo,  showModalDefect: true });
    };

    handleHideModal = () => {
        this.setState({ veiculoSelecionado: null, showModal: false, showModalDefect: false });
    };

    handleShowModal = () => {
        this.setState({ showModal: true });
    };

    handleHideModal = () => {
        this.setState({ showModal: false });
    };

    handleCloseModal = () => {
        this.setState({ veiculoSelecionado: null });
    };
    handleCloseModalDefect = () => {
        this.setState({ defectSelected: null });
    };

    componentDidMount() {
        this.getdataSet();
    }

    getdataSet = () => {
        axios.get('http://localhost:8989/api/veiculo')
            .then(response => {
                this.setState({ veiculos: response.data.data });
                console.log(this.state.veiculos);
            })
            .catch(error => {
                console.error(error);
            });
    }

    deleteVeiculo = (id) => {
        axios.delete('http://localhost:8989/api/veiculo/' + id)
            .then(response => {
                if (response.data.data.code == 200) {
                    Swal.fire(
                        'Excluído!',
                        'O item foi excluído com sucesso.',
                        'success'
                    )
                    return this.getdataSet();
                }
                return Swal.fire(
                    'Error!',
                    'algo de errado aconteceu, tente novamente.',
                    'error'
                )

            })
            .catch(error => {
                console.error(error);
                console.log(error.response.data.errors.id[0]);
                return Swal.fire(
                    'Error!',
                    error.response.data.errors.id[0],
                    'error'
                )
            });
    }
    render() {
        return (
            <>
                <Card>
                    <Card.Header><h1 >Cadastro de veículos</h1></Card.Header>
                    <Card.Body>
                        <Createveiculo getdataSet={this.getdataSet} />
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header><h1 >Listagem Veículos</h1></Card.Header>
                    <Card.Body>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Modelo</th>
                                    <th>Fabricante</th>
                                    <th>Ano</th>
                                    <th>Preço</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.veiculos.map((veiculo) =>
                                        <tr key={veiculo.id} >
                                            <td >{veiculo.modelo}</td>
                                            <td>{veiculo.fabricante}</td>
                                            <td>{veiculo.ano}</td>
                                            <td>{veiculo.preco}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => this.deleteVeiculo(veiculo.id)}>Excluir</Button>/
                                                <Button variant="primary" onClick={() => this.handleEdit(veiculo)}>Atualizar</Button>/
                                                <Button variant="info" onClick={() => this.handleDefect(veiculo)}>Defeitos</Button>

                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                {this.state.veiculoSelecionado && (
                    <EditVeiculo
                        showModal={this.state.showModal}
                        veiculo={this.state.veiculoSelecionado}
                        handleCloseModal={this.handleCloseModal}
                        getdataSet={this.getdataSet}
                    />
                )}
                {this.state.defectSelected && (
                    <Defeitos
                        showModalDefect={this.state.showModalDefect}
                        veiculo={this.state.defectSelected}
                        handleCloseModal={this.handleCloseModalDefect}
                        getdataSet={this.getdataSet}
                    />
                )}
            </>
        );
    }
}

export default Home;
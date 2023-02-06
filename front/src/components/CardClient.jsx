import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CardClient = ({ clientId, userId, clientName, qtdPedido }) => {
    const [content, setContent] = useState(null);

    // console.log(qtdPedido);

    useEffect(() => {
        qtdPedido != 1
            ? setContent(<span className="">{qtdPedido} pedidos</span>)
            : setContent(<span className="">{qtdPedido} pedido</span>);
    }, [clientName]);

    if (clientName) {
        return (
            <Link to={`cliente/${clientId}`} className="text-decoration-none px-0">
                <Card className="px-0 mt-3">
                    <Card.Body className="d-flex text-black shadow-sm justify-content-between btn bg-light">
                        <span className="">{clientName}</span>
                        
                        {content}
                        {/* <i className="bx bxs-edit-alt col-1"></i> */}
                    </Card.Body>
                </Card>
            </Link>
        );
    } else return null;
};

export default CardClient;

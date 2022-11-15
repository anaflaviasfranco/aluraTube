import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js'

// Whiteboarding
// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL= "https://rttuydvzlqulobtuxzdh.supabase.co";
const PROJECT_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHV5ZHZ6bHF1bG9idHV4emRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0Nzg5MTEsImV4cCI6MTk4NDA1NDkxMX0.Q9yA9DnZUi6_Nqiz1c6GABv_WcVsXn5tyTitbksOEfc";

const supabase = createClient(PROJECT_URL, PROJECT_KEY);



function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://youtube.." }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);


    console.log();

    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
        - titulo
        - url do vídeo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);

                            //contrato entre o nosso front e o backend
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                        })
                        .then((oqueveio) => {
                            console.log(oqueveio);
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input
                                placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}


// [X] Falta o botão para adicionar
// [X] Modal
// -> [X] Precisamos controlar o state
// -> Formulário em si
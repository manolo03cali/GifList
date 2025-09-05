// Definimos la interfaz Props que describe las propiedades que el componente recibirá:
// - title: string (obligatorio) → será el título principal.
// - description?: string (opcional, por el "?" ) → puede o no venir, es un texto descriptivo.
interface Props {
  title: string;
  description?: string;
}

// Definimos el componente funcional CustomHeader.
// Este componente recibe las props title y description tipadas con la interfaz Props.
export const CustomHeader = ({ title, description }: Props) => {
  return (
    // Contenedor con clase CSS "content-center"
    <div className="content-center">
      {/* Renderiza el título principal */}
      <h1>{title}</h1>

      {/* Renderiza el párrafo de descripción SOLO si la prop `description` existe */}
      {description && <p>{description}</p>}
    </div>
  );
};

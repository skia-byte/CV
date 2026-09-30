import excelImage from "../componentes/img/uso1.png";
import marketingImage from "../componentes/img/uso2.png";
import capcutImage from "../componentes/img/uso3.png";
import comunicacionImage from "../componentes/img/uso4.png";

export const cursos = [
  {
    id: "excel",
    titulo: "Excel desde cero",
    area: "Ofimática",
    descripcion:
      "Aprende a organizar información, usar fórmulas básicas y trabajar con datos.",
    imagen: excelImage,
    videoId: "oglcbgVHX58",
    videoTitulo: "Excel para Principiantes desde Cero en 20 Minutos",
    canal: "Excel In Spanish",
    preguntas: [
      {
        pregunta: "¿Con qué carácter comienza una fórmula en Excel?",
        opciones: ["=", "#", "@", "&"],
        correcta: 0,
      },
      {
        pregunta: "¿Qué hace la función SUMA?",
        opciones: [
          "Ordena una lista alfabéticamente",
          "Suma los valores de un rango",
          "Cuenta solo las celdas vacías",
          "Cambia el formato de fecha",
        ],
        correcta: 1,
      },
      {
        pregunta: "¿Para qué sirve un filtro en una tabla?",
        opciones: [
          "Para ocultar permanentemente los datos",
          "Para cambiar el nombre del archivo",
          "Para mostrar filas que cumplen ciertos criterios",
          "Para sumar todos los datos automáticamente",
        ],
        correcta: 2,
      },
      {
        pregunta:
          "¿Qué mantiene fija una referencia como $A$1 al copiar una fórmula?",
        opciones: [
          "El color de la celda",
          "La fila y la columna de la referencia",
          "El ancho de la columna",
          "El nombre de la hoja",
        ],
        correcta: 1,
      },
    ],
  },
  {
    id: "marketing",
    titulo: "Marketing digital",
    area: "Marketing",
    descripcion:
      "Reconoce a tu audiencia, comunica una propuesta de valor y entiende cómo medir resultados.",
    imagen: marketingImage,
    videoId: "UlyN_mKVlnc",
    videoTitulo: "Marketing Digital para Principiantes 2025",
    canal: "José Antonio González",
    preguntas: [
      {
        pregunta: "¿Qué describe mejor a un público objetivo?",
        opciones: [
          "Las personas a quienes se dirige una oferta",
          "Todas las personas que usan internet",
          "Solo quienes ya compraron",
          "Las marcas competidoras",
        ],
        correcta: 0,
      },
      {
        pregunta: "¿Qué es una llamada a la acción (CTA)?",
        opciones: [
          "Un reporte financiero",
          "Una invitación clara a realizar el siguiente paso",
          "Una imagen de portada",
          "Una lista de seguidores",
        ],
        correcta: 1,
      },
      {
        pregunta: "¿Para qué sirve un KPI?",
        opciones: [
          "Para definir el diseño de una publicación",
          "Para medir el avance hacia un objetivo",
          "Para reemplazar la estrategia",
          "Para automatizar todas las ventas",
        ],
        correcta: 1,
      },
      {
        pregunta: "¿Qué representa un embudo de marketing?",
        opciones: [
          "Las etapas que recorre una persona hasta convertirse en cliente",
          "Un calendario de vacaciones",
          "Una lista de contraseñas",
          "El inventario de productos",
        ],
        correcta: 0,
      },
    ],
  },
  {
    id: "capcut",
    titulo: "Edición de video con CapCut",
    area: "Creación de contenido",
    descripcion:
      "Edita clips desde el móvil, organiza una secuencia y prepara un video para compartir.",
    imagen: capcutImage,
    videoId: "0hvhqmZI2_s",
    videoTitulo: "Tutorial de CapCut para principiantes",
    canal: "Ricardo Mejias",
    preguntas: [
      {
        pregunta: "¿Para qué sirve la línea de tiempo en un editor de video?",
        opciones: [
          "Para ordenar y ajustar clips y sonidos",
          "Para cambiar la contraseña de la cuenta",
          "Para publicar automáticamente",
          "Para borrar el proyecto",
        ],
        correcta: 0,
      },
      {
        pregunta: "¿Qué permite hacer la herramienta Dividir?",
        opciones: [
          "Separar un clip en partes en el punto seleccionado",
          "Subir el volumen de todo el dispositivo",
          "Cambiar el idioma de la aplicación",
          "Crear una cuenta nueva",
        ],
        correcta: 0,
      },
      {
        pregunta: "¿Qué aporta agregar subtítulos a un video?",
        opciones: [
          "Mejora la comprensión y accesibilidad del contenido",
          "Aumenta automáticamente la resolución",
          "Evita tener que revisar el video",
          "Cambia la duración de cada clip",
        ],
        correcta: 0,
      },
      {
        pregunta: "¿Qué significa exportar un proyecto?",
        opciones: [
          "Guardar el video final como un archivo reproducible",
          "Eliminar todos los clips",
          "Mover el video a la línea de tiempo",
          "Añadir una transición",
        ],
        correcta: 0,
      },
    ],
  },
  {
    id: "comunicacion-asertiva",
    titulo: "Comunicación asertiva",
    area: "Comunicación",
    descripcion:
      "Expresa ideas y necesidades con claridad, respeto y escucha activa en el trabajo.",
    imagen: comunicacionImage,
    videoId: "zANvAzAM6Zk",
    videoTitulo: "Domina la Comunicación Asertiva",
    canal: "Canal 7 SLP",
    preguntas: [
      {
        pregunta: "¿Qué caracteriza a una comunicación asertiva?",
        opciones: [
          "Expresar lo que se piensa con claridad y respeto",
          "Aceptar todas las propuestas para evitar desacuerdos",
          "Imponer la propia opinión",
          "Evitar conversaciones difíciles",
        ],
        correcta: 0,
      },
      {
        pregunta: "¿Qué demuestra la escucha activa?",
        opciones: [
          "Preparar una respuesta mientras la otra persona habla",
          "Parafrasear lo entendido y confirmar si es correcto",
          "Cambiar rápidamente de tema",
          "Interrumpir para dar una solución",
        ],
        correcta: 1,
      },
      {
        pregunta: "¿Cuál es un ejemplo de mensaje en primera persona?",
        opciones: [
          "Siempre entregas todo tarde",
          "No sabes organizarte",
          "Me preocupa el retraso porque afecta la entrega; acordemos un nuevo plazo",
          "Tú tienes la culpa del problema",
        ],
        correcta: 2,
      },
      {
        pregunta: "¿Cómo conviene expresar un límite en el trabajo?",
        opciones: [
          "Con una frase clara, concreta y respetuosa",
          "Dejando de responder sin explicación",
          "Usando sarcasmo para que se entienda",
          "Esperando que la otra persona lo adivine",
        ],
        correcta: 0,
      },
    ],
  },
];

export const obtenerCurso = (cursoId) =>
  cursos.find((curso) => curso.id === cursoId);

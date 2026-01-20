import VideoCreator from "../components/VideoCreator";

export default function VideoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold">Faça um vídeo</h2>
        <p className="text-muted-foreground">
          Crie rapidamente um vídeo curto com seus países favoritos para compartilhar com clientes,
          alunos ou amigos.
        </p>
      </div>

      <VideoCreator />
    </div>
  );
}

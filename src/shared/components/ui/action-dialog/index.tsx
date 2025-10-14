"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/ui/dialog";
import { Button } from "@/shared/components/shadcn/ui/button";
import Image from "next/image";
import DangerImg from "@/shared/images/danger.png";
import { Typography } from "../typography";
import { useCallback, useState } from "react";

interface ActionDialogProps {
  trigger: React.ReactNode;
  description?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

/**
 * `ActionDialog` é um modal de confirmação para ações críticas (ex: excluir registro).
 *
 * ### Props
 * - `trigger: React.ReactNode` → Elemento que dispara a abertura do modal.
 * - `description?: string` → Texto descritivo da ação (default: "Tem certeza que deseja excluir este cadastro?").
 * - `onConfirm: () => void | Promise<void>` → Função chamada ao confirmar a ação.
 *   - Pode ser assíncrona. Enquanto executa, o botão "Confirmar" exibe loading e fica desabilitado.
 *   - O modal fecha automaticamente após a execução.
 * - `onCancel?: () => void` → Função chamada ao cancelar.
 */
export function ActionDialog({
  onConfirm,
  description = "Tem certeza que deseja excluir este cadastro?",
  trigger,
  onCancel,
}: ActionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    if (loading) return;
    setOpen(false);
    onCancel?.();
  }, [onCancel, loading]);

  const handleConfirm = useCallback(async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }, [onConfirm]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-128 h-72 rounded-sm"
      >
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-4 text-center max-w-4/6 mx-auto">
            <Image
              src={DangerImg}
              alt="Imagem de alerta de ação perigosa"
              width={96}
              height={96}
            />
            <Typography className="text-xl">{description}</Typography>
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

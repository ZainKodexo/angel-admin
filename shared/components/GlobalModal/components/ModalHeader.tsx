import { DialogDescription, DialogTitle } from '@/shared/components';

type ModalHeaderProps = {
  title: string;
  description?: string;
};

const ModalHeader = ({ description, title }: ModalHeaderProps) => {
  return (
    <div className={'flex flex-col gap-1'}>
      <div className={'flex items-center justify-between'}>
        <DialogTitle className={'font-inter text-2xl font-medium'}>
          {title}
        </DialogTitle>
      </div>
      <DialogDescription
        className={'font-inter text-content-secondary text-base font-normal'}
      >
        {description}
      </DialogDescription>
    </div>
  );
};

export { ModalHeader };

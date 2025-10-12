import { Button } from "./ui/button";

type PageAndSize = {
  size: number;
  page: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata: { count, hasNextPage },
}: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffSet = startOffset - 1 + pagination.size;
  const actualEndOffSet = Math.min(endOffSet, count);

  const label = `${startOffset} - ${endOffSet} of ${actualEndOffSet}`;

  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };
  const handlePreviousPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  return (
    <div className="flex justify-between items-center w-full">
      <p className="text-sm text-muted-foreground">{label}</p>

      <div className="flex gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export { Pagination };

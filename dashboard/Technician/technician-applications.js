// ========================================
// TECHNICIAN APPLICATION REVIEW
// ========================================

document.addEventListener(
    'DOMContentLoaded',
    async function () {

        const supabase =
            window.supabaseClient;

        if (!supabase) {

            alert(
                'Supabase is not configured.'
            );

            return;
        }


        // ========================================
        // ELEMENTS
        // ========================================

        const applicationsContainer =
            document.getElementById(
                'applicationsContainer'
            );

        const statusFilter =
            document.getElementById(
                'statusFilter'
            );

        const refreshButton =
            document.getElementById(
                'refreshApplicationsBtn'
            );

        const pendingCount =
            document.getElementById(
                'pendingCount'
            );

        const approvedCount =
            document.getElementById(
                'approvedCount'
            );

        const rejectedCount =
            document.getElementById(
                'rejectedCount'
            );

        const applicationModal =
            new bootstrap.Modal(
                document.getElementById(
                    'applicationModal'
                )
            );

        const rejectionModal =
            new bootstrap.Modal(
                document.getElementById(
                    'rejectionModal'
                )
            );

        let selectedApplicationId = null;


        // ========================================
        // GET SESSION
        // ========================================

        const {
            data: sessionData,
        } = await supabase.auth.getSession();


        if (!sessionData.session) {

            window.location.href =
                '../../auth/auth.html';

            return;
        }


        // ========================================
        // LOAD APPLICATIONS
        // ========================================

        async function loadApplications() {

            applicationsContainer.innerHTML = `
                <div class="text-center py-5">

                    <div
                        class="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p class="text-muted mt-3">
                        Loading applications...
                    </p>

                </div>
            `;


            try {

                const status =
                    statusFilter.value;


                const {
                    data,
                    error
                } =
                    await supabase.functions.invoke(
                        'review-technician-application',
                        {
                            body: {
                                action: 'list',
                                status
                            }
                        }
                    );


                if (error) {
                    throw error;
                }


                if (!data?.success) {

                    throw new Error(
                        data?.error ||
                        'Unable to load applications.'
                    );
                }


                renderApplications(
                    data.applications || []
                );


                await loadStatistics();


            } catch (error) {

                console.error(
                    'Error loading applications:',
                    error
                );


                applicationsContainer.innerHTML = `
                    <div class="alert alert-danger">

                        <i class="fas fa-exclamation-circle"></i>

                        Unable to load technician applications.

                        <br>

                        <small>
                            ${escapeHtml(
                                error.message ||
                                ''
                            )}
                        </small>

                    </div>
                `;
            }
        }


        // ========================================
        // STATISTICS
        // ========================================

        async function loadStatistics() {

            try {

                const statuses = [
                    'pending',
                    'approved',
                    'rejected'
                ];


                const results = await Promise.all(
                    statuses.map(
                        async status => {

                            const {
                                data,
                                error
                            } =
                                await supabase.functions.invoke(
                                    'review-technician-application',
                                    {
                                        body: {
                                            action: 'list',
                                            status
                                        }
                                    }
                                );


                            if (error) {
                                throw error;
                            }


                            return {
                                status,
                                count:
                                    data?.applications?.length || 0
                            };
                        }
                    )
                );


                results.forEach(result => {

                    if (
                        result.status ===
                        'pending'
                    ) {

                        pendingCount.textContent =
                            result.count;

                    }

                    if (
                        result.status ===
                        'approved'
                    ) {

                        approvedCount.textContent =
                            result.count;

                    }

                    if (
                        result.status ===
                        'rejected'
                    ) {

                        rejectedCount.textContent =
                            result.count;

                    }
                });


            } catch (error) {

                console.error(
                    'Statistics error:',
                    error
                );
            }
        }


        // ========================================
        // RENDER APPLICATIONS
        // ========================================

        function renderApplications(
            applications
        ) {

            if (!applications.length) {

                applicationsContainer.innerHTML = `
                    <div class="text-center py-5">

                        <i
                            class="fas fa-inbox fs-1 text-muted"
                        ></i>

                        <h5 class="mt-3">
                            No applications found
                        </h5>

                        <p class="text-muted">
                            There are no applications
                            matching this status.
                        </p>

                    </div>
                `;

                return;
            }


            applicationsContainer.innerHTML =
                applications
                    .map(
                        application =>
                            createApplicationCard(
                                application
                            )
                    )
                    .join('');


            document
                .querySelectorAll(
                    '[data-application-id]'
                )
                .forEach(button => {

                    button.addEventListener(
                        'click',
                        function () {

                            const id =
                                this.dataset
                                    .applicationId;

                            openApplication(
                                id
                            );
                        }
                    );
                });
        }


        // ========================================
        // APPLICATION CARD
        // ========================================

        function createApplicationCard(
            application
        ) {

            const fullName =
                `${application.first_name} ${application.last_name}`;


            const statusBadge =
                getStatusBadge(
                    application.status
                );


            const photo =
                application.profile_photo ||
                `https://via.placeholder.com/100/218DA6/ffffff?text=${encodeURIComponent(
                    application.first_name
                        .charAt(0)
                )}`;


            return `

                <div class="border rounded-3 p-3 mb-3">

                    <div class="row align-items-center g-3">

                        <div class="col-auto">

                            <img
                                src="${escapeAttribute(photo)}"
                                alt="${escapeAttribute(fullName)}"
                                style="
                                    width:70px;
                                    height:70px;
                                    object-fit:cover;
                                    border-radius:50%;
                                "
                            >

                        </div>


                        <div class="col">

                            <h5 class="mb-1">
                                ${escapeHtml(fullName)}
                            </h5>

                            <p class="mb-1 text-muted">
                                ${escapeHtml(
                                    application.email
                                )}
                            </p>

                            <div>

                                ${statusBadge}

                                ${
                                    application.specialty
                                        ? `
                                            <span class="badge bg-light text-dark ms-1">
                                                ${escapeHtml(
                                                    application.specialty
                                                )}
                                            </span>
                                        `
                                        : ''
                                }

                            </div>

                        </div>


                        <div class="col-md-2 text-md-end">

                            <small class="text-muted d-block">
                                Applied
                            </small>

                            <span>
                                ${formatDate(
                                    application.created_at
                                )}
                            </span>

                        </div>


                        <div class="col-md-auto">

                            <button
                                type="button"
                                class="btn btn-primary"
                                data-application-id="${application.id}"
                            >

                                <i class="fas fa-eye"></i>

                                Review

                            </button>

                        </div>

                    </div>

                </div>
            `;
        }


        // ========================================
        // OPEN APPLICATION
        // ========================================

        async function openApplication(
            applicationId
        ) {

            document.getElementById(
                'applicationModalBody'
            ).innerHTML = `
                <div class="text-center py-5">

                    <div
                        class="spinner-border text-primary"
                    ></div>

                    <p class="mt-3">
                        Loading application...
                    </p>

                </div>
            `;


            document.getElementById(
                'applicationModalFooter'
            ).innerHTML = '';


            applicationModal.show();


            try {

                const {
                    data,
                    error
                } =
                    await supabase.functions.invoke(
                        'review-technician-application',
                        {
                            body: {
                                action: 'get',
                                applicationId
                            }
                        }
                    );


                if (error) {
                    throw error;
                }


                if (!data?.success) {

                    throw new Error(
                        data?.error ||
                        'Unable to load application.'
                    );
                }


                const application =
                    data.application;


                renderApplicationDetails(
                    application
                );


            } catch (error) {

                console.error(
                    'Application detail error:',
                    error
                );


                document.getElementById(
                    'applicationModalBody'
                ).innerHTML = `

                    <div class="alert alert-danger">

                        ${escapeHtml(
                            error.message ||
                            'Unable to load application.'
                        )}

                    </div>

                `;
            }
        }


        // ========================================
        // APPLICATION DETAILS
        // ========================================

        function renderApplicationDetails(
            application
        ) {

            selectedApplicationId =
                application.id;


            const fullName =
                `${application.first_name} ${application.last_name}`;


            const photo =
                application.profile_photo ||
                `https://via.placeholder.com/180/218DA6/ffffff?text=${encodeURIComponent(
                    application.first_name
                        .charAt(0)
                )}`;


            document.getElementById(
                'applicationModalTitle'
            ).textContent =
                fullName;


            document.getElementById(
                'applicationModalBody'
            ).innerHTML = `

                <div class="row g-4">


                    <!-- PROFILE -->

                    <div class="col-md-4">

                        <div class="text-center mb-4">

                            <img
                                src="${escapeAttribute(photo)}"
                                alt="${escapeAttribute(fullName)}"
                                class="img-fluid rounded-circle shadow-sm"
                                style="
                                    width:180px;
                                    height:180px;
                                    object-fit:cover;
                                "
                            >

                            <h4 class="mt-3 mb-1">
                                ${escapeHtml(fullName)}
                            </h4>

                            <p class="text-muted">
                                ${escapeHtml(
                                    application.email
                                )}
                            </p>

                            ${getStatusBadge(
                                application.status
                            )}

                        </div>


                        <div class="card border-0 bg-light">

                            <div class="card-body">

                                <h6 class="fw-bold">
                                    Professional Information
                                </h6>

                                <hr>

                                ${detailItem(
                                    'Specialty',
                                    application.specialty
                                )}

                                ${detailItem(
                                    'Experience',
                                    application.experience_years !== null
                                        ? `${application.experience_years} years`
                                        : null
                                )}

                                ${detailItem(
                                    'Location',
                                    application.location
                                )}

                                ${detailItem(
                                    'Hourly Rate',
                                    application.hourly_rate !== null
                                        ? `$${application.hourly_rate}`
                                        : null
                                )}

                                ${detailItem(
                                    'Languages',
                                    arrayToText(
                                        application.languages
                                    )
                                )}

                                ${detailItem(
                                    'Availability',
                                    application.availability
                                )}

                            </div>

                        </div>

                    </div>


                    <!-- INFORMATION -->

                    <div class="col-md-8">


                        ${section(
                            'Experience',
                            application.experience_description
                        )}


                        ${section(
                            'Professional Information',
                            application.professional_info
                        )}


                        ${arraySection(
                            'Technologies',
                            application.technologies
                        )}


                        ${arraySection(
                            'Products',
                            application.products
                        )}


                        ${arraySection(
                            'Certifications',
                            application.certifications
                        )}


                        ${
                            application.certification_photos?.length
                                ? `
                                    <div class="mb-4">

                                        <h6 class="fw-bold">
                                            Certification Photos
                                        </h6>

                                        <div class="row g-2">

                                            ${application.certification_photos
                                                .map(
                                                    (photo, index) => `
                                                        <div class="col-md-4">

                                                            <a
                                                                href="${escapeAttribute(photo)}"
                                                                target="_blank"
                                                            >

                                                                <img
                                                                    src="${escapeAttribute(photo)}"
                                                                    alt="Certification ${index + 1}"
                                                                    class="img-fluid rounded border"
                                                                    style="
                                                                        width:100%;
                                                                        height:160px;
                                                                        object-fit:cover;
                                                                    "
                                                                >

                                                            </a>

                                                        </div>
                                                    `
                                                )
                                                .join('')}

                                        </div>

                                    </div>
                                `
                                : ''
                        }


                        ${
                            application.rejection_reason
                                ? `
                                    <div class="alert alert-danger">

                                        <strong>
                                            Rejection Reason
                                        </strong>

                                        <p class="mb-0 mt-2">
                                            ${escapeHtml(
                                                application.rejection_reason
                                            )}
                                        </p>

                                    </div>
                                `
                                : ''
                        }

                    </div>

                </div>
            `;


            // ========================================
            // FOOTER ACTIONS
            // ========================================

            const footer =
                document.getElementById(
                    'applicationModalFooter'
                );


            if (
                application.status ===
                'pending'
            ) {

                footer.innerHTML = `

                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>


                    <button
                        type="button"
                        id="modalRejectBtn"
                        class="btn btn-danger"
                    >

                        <i class="fas fa-times"></i>

                        Reject

                    </button>


                    <button
                        type="button"
                        id="modalApproveBtn"
                        class="btn btn-success"
                    >

                        <i class="fas fa-check"></i>

                        Approve

                    </button>

                `;


                document.getElementById(
                    'modalApproveBtn'
                ).addEventListener(
                    'click',
                    () => approveApplication(
                        application.id
                    )
                );


                document.getElementById(
                    'modalRejectBtn'
                ).addEventListener(
                    'click',
                    () => {

                        selectedApplicationId =
                            application.id;

                        applicationModal.hide();

                        document.getElementById(
                            'rejectionReason'
                        ).value = '';

                        rejectionModal.show();
                    }
                );

            } else {

                footer.innerHTML = `

                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>

                `;
            }
        }


        // ========================================
        // APPROVE
        // ========================================

        async function approveApplication(
            applicationId
        ) {

            const confirmed =
                confirm(
                    'Are you sure you want to approve this technician application?'
                );


            if (!confirmed) return;


            try {

                const {
                    data,
                    error
                } =
                    await supabase.functions.invoke(
                        'review-technician-application',
                        {
                            body: {
                                action: 'approve',
                                applicationId
                            }
                        }
                    );


                if (error) {
                    throw error;
                }


                if (!data?.success) {

                    throw new Error(
                        data?.error ||
                        'Unable to approve application.'
                    );
                }


                applicationModal.hide();

                alert(
                    'RESPUESTA DE APROBACIÓN:\n\n' +
                    JSON.stringify(data, null, 2)
                );


                await loadApplications();


            } catch (error) {

                console.error(
                    'Approval error:',
                    error
                );


                alert(
                    error.message ||
                    'Unable to approve application.'
                );
            }
        }


        // ========================================
        // REJECT
        // ========================================

        document.getElementById(
            'confirmRejectBtn'
        ).addEventListener(
            'click',
            async function () {

                const reason =
                    document.getElementById(
                        'rejectionReason'
                    ).value.trim();


                if (!reason) {

                    alert(
                        'Please provide a rejection reason.'
                    );

                    return;
                }


                this.disabled = true;


                try {

                    const {
                        data,
                        error
                    } =
                        await supabase.functions.invoke(
                            'review-technician-application',
                            {
                                body: {
                                    action: 'reject',
                                    applicationId:
                                        selectedApplicationId,
                                    rejectionReason:
                                        reason
                                }
                            }
                        );


                    if (error) {
                        throw error;
                    }


                    if (!data?.success) {

                        throw new Error(
                            data?.error ||
                            'Unable to reject application.'
                        );
                    }


                    rejectionModal.hide();


                    alert(
                        'Technician application rejected.'
                    );


                    await loadApplications();


                } catch (error) {

                    console.error(
                        'Rejection error:',
                        error
                    );


                    alert(
                        error.message ||
                        'Unable to reject application.'
                    );


                } finally {

                    this.disabled = false;
                }
            }
        );


        // ========================================
        // EVENTS
        // ========================================

        statusFilter.addEventListener(
            'change',
            loadApplications
        );


        refreshButton.addEventListener(
            'click',
            loadApplications
        );


        // ========================================
        // HELPERS
        // ========================================

        function getStatusBadge(status) {

            const config = {

                pending: {
                    className: 'bg-warning text-dark',
                    icon: 'fa-clock',
                    text: 'Pending'
                },

                approved: {
                    className: 'bg-success',
                    icon: 'fa-check',
                    text: 'Approved'
                },

                rejected: {
                    className: 'bg-danger',
                    icon: 'fa-times',
                    text: 'Rejected'
                }

            };


            const item =
                config[status] ||
                config.pending;


            return `
                <span class="badge ${item.className}">

                    <i class="fas ${item.icon}"></i>

                    ${item.text}

                </span>
            `;
        }


        function detailItem(
            label,
            value
        ) {

            if (
                value === null ||
                value === undefined ||
                value === ''
            ) {
                return '';
            }


            return `

                <div class="mb-3">

                    <small class="text-muted d-block">
                        ${label}
                    </small>

                    <strong>
                        ${escapeHtml(
                            String(value)
                        )}
                    </strong>

                </div>
            `;
        }


        function section(
            title,
            content
        ) {

            if (
                !content ||
                !String(content).trim()
            ) {
                return '';
            }


            return `

                <div class="mb-4">

                    <h6 class="fw-bold">
                        ${title}
                    </h6>

                    <div class="p-3 bg-light rounded">
                        ${escapeHtml(
                            String(content)
                        ).replace(
                            /\n/g,
                            '<br>'
                        )}
                    </div>

                </div>
            `;
        }


        function arraySection(
            title,
            values
        ) {

            if (
                !Array.isArray(values) ||
                !values.length
            ) {
                return '';
            }


            return `

                <div class="mb-4">

                    <h6 class="fw-bold">
                        ${title}
                    </h6>

                    <div class="d-flex flex-wrap gap-2">

                        ${values
                            .map(
                                value => `
                                    <span class="badge bg-light text-dark border">
                                        ${escapeHtml(
                                            String(value)
                                        )}
                                    </span>
                                `
                            )
                            .join('')}

                    </div>

                </div>
            `;
        }


        function arrayToText(
            values
        ) {

            if (
                !Array.isArray(values) ||
                !values.length
            ) {
                return null;
            }

            return values.join(', ');
        }


        function formatDate(
            value
        ) {

            if (!value) return '-';

            return new Date(
                value
            ).toLocaleDateString(
                'en-US',
                {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }
            );
        }


        function escapeHtml(
            value
        ) {

            return String(value ?? '')
                .replace(
                    /&/g,
                    '&amp;'
                )
                .replace(
                    /</g,
                    '&lt;'
                )
                .replace(
                    />/g,
                    '&gt;'
                )
                .replace(
                    /"/g,
                    '&quot;'
                )
                .replace(
                    /'/g,
                    '&#039;'
                );
        }


        function escapeAttribute(
            value
        ) {

            return escapeHtml(value);
        }


        // ========================================
        // START
        // ========================================

        await loadApplications();

    }
);